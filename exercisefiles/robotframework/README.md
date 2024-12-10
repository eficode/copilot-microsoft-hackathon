#Workflow

1. Check with copilot that what does the data folder contain
2. Implement MetarReader.py based on tests/test_metarreader.py
3. Implement tests based on functional requirements found from this readme


# Functional requirements for METAR Reader

## Data Management
- The system should read METAR data from a file and store it internally.
- Each METAR entry should be associated with a unique site identifier.
- The system should count the number of unique sites.

## Site Existence
- The system should check if a site exists.
- The system should check if a site does not exist.
- If a site is expected to exist but does not, the system should raise an error.
- If a site is expected not to exist but does, the system should raise an error.

## Precipitation Check
- The system should check if it is raining at a specific site.
- If it is expected to rain at a site but does not, the system should raise an error.
- If it is not expected to rain at a site but does, the system should raise an error.

## Remarks Handling
- The system should retrieve remarks for a specific site.
- If remarks are expected for a site but do not exist, the system should raise an error.
- If remarks are not expected for a site but exist, the system should raise an error.
- The system should check if a site has a specific remark (e.g., "AO2" for precipitation sensor).

# Test Cases

## Metar File Contains Data
- Initially, the number of sites should be 0.
- After adding data from metar_data.txt, the number of sites should be 6.

## Can Find Entry
- Initially, the site "KCPW" should not exist.
- Expect an error when checking if the site "KCPW" exists.
- After adding data from metar_data.txt, the site "KCPW" should exist.
- Expect an error when checking if the site "KCPW" does not exist.

## Can Check for Rain
- Expect an error when checking if it should rain at "MYEG".
- Expect an error when checking if it should rain at "KFKA".
- After adding data from metar_data.txt, it should rain at "KFKA".
- Expect an error when checking if it should rain at "MYEG".

## Get Remarks
- Expect an error when checking if the site "KEHY" has a precipitation sensor.
- Expect an error when checking if the site "KFDW" has a precipitation sensor.
- After adding data from metar_data.txt, the site "KEHY" should have a precipitation sensor.
- Expect an error when checking if the site "KFDW" has a precipitation sensor.
Requirements for METAR Reader
Data Management

The system should be able to read METAR data from a file and store it internally.
Each METAR entry should be associated with a unique site identifier.
The system should be able to count the number of unique sites.
Site Existence

The system should provide functionality to check if a site exists.
The system should provide functionality to check if a site does not exist.
If a site is expected to exist but does not, the system should raise an error.
If a site is expected not to exist but does, the system should raise an error.
Precipitation Check

The system should provide functionality to check if it is raining at a specific site.
If it is expected to rain at a site but does not, the system should raise an error.
If it is not expected to rain at a site but does, the system should raise an error.
Remarks Handling

The system should provide functionality to retrieve remarks for a specific site.
If remarks are expected for a site but do not exist, the system should raise an error.
If remarks are not expected for a site but exist, the system should raise an error.
The system should be able to check if a site has a specific remark (e.g., "AO2" for precipitation sensor).
Test Cases
Metar File Contains Data

Initially, the number of sites should be 0.
After adding data from metar_data.txt, the number of sites should be 6.
Can Find Entry

Initially, the site "KCPW" should not exist.
Expect an error when checking if the site "KCPW" exists.
After adding data from metar_data.txt, the site "KCPW" should exist.
Expect an error when checking if the site "KCPW" does not exist.
Can Check for Rain

Expect an error when checking if it should rain at "MYEG".
Expect an error when checking if it should rain at "KFKA".
After adding data from metar_data.txt, it should rain at "KFKA".
Expect an error when checking if it should rain at "MYEG".
Get Remarks

Expect an error when checking if the site "KEHY" has a precipitation sensor.
Expect an error when checking if the site "KFDW" has a precipitation sensor.
After adding data from metar_data.txt, the site "KEHY" should have a precipitation sensor.
Expect an error when checking if the site "KFDW" has a precipitation sensor.