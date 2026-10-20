<?php

declare(strict_types=1);

// Kopiera filen till booking-config.php på kontots rot på Simply (samma nivå som mapparna api och public_html).
// Den riktiga filen ska aldrig committas eller ligga i en publik webbmapp.
return [
    'smtp_host' => 'websmtp.simply.com',
    'smtp_port' => 587,
    'smtp_username' => 'kontakt@vass-sliperi.se',
    'smtp_password' => 'FYLL_I_LOSENORDET_HAR',
    'from_email' => 'kontakt@vass-sliperi.se',
    'from_name' => 'VASS Sliperi',
    'business_email' => 'kontakt@vass-sliperi.se',
    'allowed_origins' => [
        'https://www.vass-sliperi.se',
        'https://vass-sliperi.se',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
];
