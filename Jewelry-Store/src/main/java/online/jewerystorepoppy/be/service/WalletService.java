package online.jewerystorepoppy.be.service;


import online.jewerystorepoppy.be.entity.Orders;
import online.jewerystorepoppy.be.model.OrderRequest;
import online.jewerystorepoppy.be.model.RechargeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

@Service
public class WalletService {

    @Autowired
    OrderService orderService;


}