<?php

return [

    'paths' => ['*'],

    'allowed_methods' => ['*'], // Métodos permitidos (GET, POST, etc.)

    'allowed_origins' => ['http://localhost:5174' , 'http://localhost:3000'], // Origem permitida.

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Definir cabeçalhos permitidos.

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];

