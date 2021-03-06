        m8 m4 m2 m1    (2^3) (2^2) (2^1) (2^0)
    jan  0  0  0  1 -> 0 *   0 *   0 *   1 *  = 1
    fev  0  0  1  0 -> 0 *   0 *   1 *   0 *  = 2
    dec  1  1  0  0 -> 1* +  1* +  0 * + 0 * = 12

    bissexto = 1 || 0 

    dec - m8 = 1 : m8' = 0

    entrada = m8 m4 m2 m1 (mês) ::: bissexto 

    saída = d28 | d29 | d30 | d31 
            0     0     0     1

        x = AND
        + = OR

    ## equações atômicas ## 
    d28 = (m8' x m4' x m2 x m1') x bissexto' = 1 x 1 x 1 x 1 x 1 = 1 
    d29 = 0
    d30 = 0
    d31 = 0

    nov. 1 0 1 1 = (0 x 0 x 0 x 0) + (0 x 0 x 1 x 0) + (1 x 1 x 0 x 1) +
                    (1 x 1 x 1 x 1) = 0 + 0 + 0 + 1 = 1

    0100 -> (m8 x m4' x m2 x m1)
    0110 -> (m8 x m4' x m2' x m1)
    1001 -> (m8' x m4 x m2 x m1')
    1011 -> (m8' x m4 x m2' x m1')

    1100 -> (m8' x m4' x m2 x m1)


    d31 = !d30 ou (d28 e d29)
    
    maio 0101 agosto junho julho  
    sem r = (m8 x m4' x m2 x m1') + agosto junho julho



    fev março abril jan dec novembro setembro outubro
    
          

    



                    
