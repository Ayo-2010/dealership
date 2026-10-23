$ProgressPreference = 'SilentlyContinue'
$ErrorActionPreference = 'Stop'

function Get-Unsplash([string]$id, [string]$out, [int]$w = 1600, [int]$h = 1067) {
  $url = "https://images.unsplash.com/photo-$id`?w=$w&h=$h&q=80&fm=jpg&fit=crop"
  if (-not (Test-Path $out)) {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 120
  }
  Write-Host "ok $out"
}

$veh = 'public/images/vehicles'
$cat = 'public/images/categories'
$show = 'public/images/showroom'
New-Item -ItemType Directory -Force -Path $veh, $cat, $show, 'public/images/branding' | Out-Null

$mains = @{
  'porsche-911-carrera-s' = '1549399542-7e3f8b79c341'
  'mercedes-amg-g63' = '1520031441872-265e4ff70366'
  'bmw-m4-competition' = '1502877338535-766e1452684a'
  'range-rover-evoque' = '1590362891991-f776e747a588'
  'mercedes-s500' = '1493238792000-8113da705763'
  'audi-q7' = '1517524008697-84bbe3c3fd98'
  'tesla-model-3' = '1560958089-b8a1929cea89'
  'porsche-taycan' = '1626668893632-6f3a4466d22f'
  'mercedes-amg-c43' = '1514316454349-750a7fd3da3a'
  'ford-f150-raptor' = '1551830820-330a71b99659'
  'land-rover-discovery' = '1533473359331-0135ef1b58bf'
  'vw-golf-gti' = '1541899481282-d53bffe3c35d'
  'hyundai-sonata' = '1619767886558-efdc259cde1a'
  'fiat-500' = '1549317661-bd32c8ce0db2'
  'bmw-730li' = '1601362840469-51e4d8d58785'
  'audi-tt' = '1603584173870-7f23fdae1b7a'
  'audi-rs6-avant' = '1616422285623-13ff0162193c'
  'bmw-530i' = '1555215695-3004980ad54e'
  'ford-mustang-gt' = '1494976388531-d1058494cdd8'
  'porsche-panamera' = '1503376780353-7e6692767b70'
  'audi-r8' = '1502161254066-6c74afbf07aa'
  'mercedes-amg-gt' = '1618843479313-40f8afb4b4d8'
}

foreach ($k in $mains.Keys) {
  Get-Unsplash $mains[$k] (Join-Path $veh "$k.jpg")
}

$details = @{
  'porsche-911-detail' = '1485291571150-772bcfc10da5'
  'bmw-m4-alt' = '1617531653332-bd46c24f2068'
  'range-rover-alt' = '1519641471654-76ce0107ad1b'
  'mercedes-amg-alt' = '1605559424843-9e4c228bf1c2'
  'audi-road' = '1568605117036-5fe5e7bab0b7'
  'tesla-alt' = '1606016159991-dfe4f2746ad5'
  'mercedes-c43-alt' = '1553440569-bcc63803a83d'
  'mustang-alt' = '1547038577-da80abbc4f19'
  'audi-r8-alt' = '1603584173870-7f23fdae1b7a'
  'interior-1' = '1610647752706-3bb12232b3ab'
  'interior-2' = '1449965408869-eaa3f722e40d'
  'interior-3' = '1553260168-69b041873e65'
  'luxury-coupe' = '1580273916550-e323be2ae537'
  'suv-profile' = '1533473359331-0135ef1b58bf'
  'sedan-profile' = '1619767886558-efdc259cde1a'
  'hatch-profile' = '1541899481282-d53bffe3c35d'
  'pickup-profile' = '1551830820-330a71b99659'
  'grand-tourer' = '1618843479313-40f8afb4b4d8'
  'showroom-car' = '1485291571150-772bcfc10da5'
}
foreach ($k in $details.Keys) {
  Get-Unsplash $details[$k] (Join-Path $veh "$k.jpg")
}

# Category imagery (4:3)
$cats = @{
  'suv' = '1533473359331-0135ef1b58bf'
  'sedan' = '1493238792000-8113da705763'
  'coupe' = '1502161254066-6c74afbf07aa'
  'hatchback' = '1541899481282-d53bffe3c35d'
  'pickup' = '1551830820-330a71b99659'
  'luxury' = '1580273916550-e323be2ae537'
}
foreach ($k in $cats.Keys) {
  Get-Unsplash $cats[$k] (Join-Path $cat "$k.jpg") 1200 900
}

# Hero (cinematic)
Get-Unsplash '1616422285623-13ff0162193c' 'public/images/hero-showroom.jpg' 2400 1350
Get-Unsplash '1616422285623-13ff0162193c' 'public/images/og-vantage-motors.jpg' 1200 630

# Showroom photography (Pexels, free to use)
$pexels = @{
  'showroom-1' = 'https://images.pexels.com/photos/9702325/pexels-photo-9702325.jpeg?auto=compress&cs=tinysrgb&w=1800'
  'showroom-2' = 'https://images.pexels.com/photos/16176576/pexels-photo-16176576.jpeg?auto=compress&cs=tinysrgb&w=1800'
  'showroom-3' = 'https://images.pexels.com/photos/12565887/pexels-photo-12565887.jpeg?auto=compress&cs=tinysrgb&w=1800'
}
foreach ($k in $pexels.Keys) {
  $out = Join-Path $show "$k.jpg"
  if (-not (Test-Path $out)) { Invoke-WebRequest -Uri $pexels[$k] -OutFile $out -UseBasicParsing -TimeoutSec 120 }
  Write-Host "ok $out"
}

Write-Host 'All image downloads complete.'
