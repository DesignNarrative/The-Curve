<?php
/**
 * MDOC CRM Push Bridge for THE CURVE
 * Project API Key strictly assigned: 132b5197-bff7-4aa5-89f4-3c0cab7f6a45
 */

// Allow cross-origin requests from the website domain
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Only POST method is allowed']);
    exit();
}

// Read incoming data (support both JSON payload and Form POST)
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);

if (!is_array($inputData)) {
    $inputData = $_POST;
}

// Extract and sanitize name
$fullName = isset($inputData['name']) ? trim($inputData['name']) : (isset($inputData['Name']) ? trim($inputData['Name']) : '');
$nameParts = preg_split('/\s+/', $fullName, 2);
$firstName = isset($nameParts[0]) ? preg_replace('/[^a-zA-Z]/', '', $nameParts[0]) : '';
$lastName = isset($nameParts[1]) ? preg_replace('/[^a-zA-Z]/', '', $nameParts[1]) : '';

if (empty($firstName)) {
    $firstName = 'Website';
}
if (empty($lastName)) {
    $lastName = 'Lead';
}
$firstName = substr($firstName, 0, 50);
$lastName = substr($lastName, 0, 50);

// Extract and sanitize mobile number (Strict 10 digits)
$rawPhone = isset($inputData['phone']) ? $inputData['phone'] : (isset($inputData['Phone']) ? $inputData['Phone'] : '');
$cleanPhone = preg_replace('/\D/', '', $rawPhone);
$mobileNo = substr($cleanPhone, -10);

if (strlen($mobileNo) < 10) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Valid 10-digit mobile number required']);
    exit();
}

// Extract and sanitize email (MDOC requires a valid email format)
$rawEmail = isset($inputData['email']) ? trim($inputData['email']) : (isset($inputData['Email']) ? trim($inputData['Email']) : '');
if (empty($rawEmail) || !filter_var($rawEmail, FILTER_VALIDATE_EMAIL)) {
    $email = 'enquiry@thecurvevirar.com';
} else {
    $email = $rawEmail;
}

// Source and details
$sourceDescription = isset($inputData['source']) ? trim($inputData['source']) : 'The Curve Virar Website';
$preference = isset($inputData['preference']) ? trim($inputData['preference']) : '';

// UTM campaign parameters
$utmSource   = isset($inputData['utm_source']) ? trim($inputData['utm_source']) : '';
$utmMedium   = isset($inputData['utm_medium']) ? trim($inputData['utm_medium']) : '';
$utmCampaign = isset($inputData['utm_campaign']) ? trim($inputData['utm_campaign']) : '';
$utmContent  = isset($inputData['utm_content']) ? trim($inputData['utm_content']) : '';
$utmTerm     = isset($inputData['utm_term']) ? trim($inputData['utm_term']) : '';

// MDOC Endpoint and strictly assigned API Key for THE CURVE
$mdocEndpoint = 'https://abhinav.maksoftbox.com//MDocBoxAPI/MdocAddEnquiryORTeleCalling/';
$theCurveApiKey = '132b5197-bff7-4aa5-89f4-3c0cab7f6a45';

// Build payload per MDOC API Document specifications
$mdocPayload = [
    'DataFrom'            => 'T', // "T" = TeleCalling
    'ApiKey'              => $theCurveApiKey,
    'EnquiryDate'         => date('Y-m-d'),
    'Salutation'          => '',
    'FirstName'           => $firstName,
    'MiddleName'          => '',
    'LastName'            => $lastName,
    'Email'               => $email,
    'MobileNo'            => $mobileNo,
    'WhatsAppNo'          => $mobileNo,
    'AlternativeMobileNo' => '',
    'Source'              => 'Digitals',
    'SourceDetail'        => 'WebSite',
    'SourceDescription'   => substr($sourceDescription, 0, 255),
    'Remark'              => 'Website Lead from thecurvevirar.com - ' . $sourceDescription,
    'Preferences'         => $preference,
    'City'                => 'Virar',
    'State'               => 'Maharashtra',
    'Country'             => 'India',
    'UtmCampaignSource'   => $utmSource,
    'UtmCampaignMedium'   => $utmMedium,
    'UtmCampaignName'     => $utmCampaign,
    'UtmCampaignContent'  => $utmContent,
    'UtmCampaignTerm'     => $utmTerm,
];

// Dispatch to MDOC via cURL
$ch = curl_init($mdocEndpoint);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($mdocPayload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 12,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/x-www-form-urlencoded',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode([
        'status'  => 'error',
        'message' => 'MDoc connection error: ' . $curlError
    ]);
    exit();
}

http_response_code($httpCode >= 200 && $httpCode < 300 ? 200 : $httpCode);
echo $response;
