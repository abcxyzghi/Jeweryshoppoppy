    package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.enums.AccountStatus;
import online.jewerystorepoppy.be.model.*;
import online.jewerystorepoppy.be.repository.AuthenticationRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import online.jewerystorepoppy.be.entity.Account;

import java.util.List;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AuthenticationManager authenticationManager;

    // xử lý logic
    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenService tokenService;

    @Autowired
    EmailService emailService;

    public Account update(long id, RegisterRequest registerRequest) {
        Account account = authenticationRepository.findById(id).get();

        account.setPhone(registerRequest.getPhone());
        account.setRole(registerRequest.getRole());
        account.setEmail(registerRequest.getEmail());
        account.setFullName(registerRequest.getFullName());
        return authenticationRepository.save(account);
    }

    public Account delete(long id){
        Account account = authenticationRepository.findById(id).get();
        account.setAccountStatus(AccountStatus.DELETED);
        return authenticationRepository.save(account);
    }


    public Account register(RegisterRequest registerRequest) {
        //registerRequest: thông tin ngừoi dùng yêu cầu

        // xử lý logic register
        Account account = new Account();

        account.setPhone(registerRequest.getPhone());
        account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        account.setRole(registerRequest.getRole());
        account.setEmail(registerRequest.getEmail());
        account.setFullName(registerRequest.getFullName());

        try {
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setRecipient(account.getEmail());
            emailDetail.setSubject("You are invited to system!");
            emailDetail.setMsgBody("aaa");
            emailDetail.setButtonValue("Login to system");
            emailDetail.setLink("http://jewerystorepoppy.online/");
            emailService.sendMailTemplate(emailDetail);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }

        // nhờ repo => save xuống db
        return authenticationRepository.save(account);
    }

    public AccountResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getPhone(),
                loginRequest.getPassword()
        ));
        // => account chuẩn

        Account account = authenticationRepository.findAccountByPhone(loginRequest.getPhone());
        String token = tokenService.generateToken(account);

        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setPhone(account.getPhone());
        accountResponse.setToken(token);
        accountResponse.setEmail(account.getEmail());
        accountResponse.setFullName(account.getFullName());
        accountResponse.setRole(account.getRole());

        return accountResponse;
    }

    public void forgotPasswordRequest(String email) {
        Account account = authenticationRepository.findAccountByEmail(email);
        if (account == null) {
            try {
                throw new BadRequestException("Account not found!");
            } catch (BadRequestException e) {
                throw new RuntimeException(e);
            }
        }

        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(account.getEmail());
        emailDetail.setSubject("Reset password for account " + account.getEmail() + "!");
        emailDetail.setMsgBody("aaa");
        emailDetail.setButtonValue("Reset Password");
        emailDetail.setLink("http://jewerystorepoppy.online/reset-password?token=" + tokenService.generateToken(account));
        emailService.sendMailTemplate(emailDetail);
    }

    public Account resetPassword(ResetPasswordRequest resetPasswordRequest) {
        Account account = getCurrentAccount();

        account.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        return authenticationRepository.save(account);
    }


    public List<Account> getAllAccount() {
        return authenticationRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        return authenticationRepository.findAccountByPhone(phone);
    }

    public Account getCurrentAccount() {
        return (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}