// ==UserScript==
// @name        Cisco CM Enhancements
// @namespace   http://www.avholloway.com/user-scripts
// @description Enhances Your Cisco CM Administration Experience
// @include     https://*/ccmadmin/*
// @version     1.0
// @grant       none
// ==/UserScript==

console.log('Cisco CM Enhancements Script Loaded');

var url = window.location.pathname;

// Hot Key Sequences
var hkeys = [],

    // All hotkeys begin with 'g' for 'Go To'
    hkey = 'g,',

        // System Menu hotkeys begin with 's'
        hkeysystem = hkey + 's,',

            // Servers
            hkeyservers = hkeysystem + 's',
            // CallManagers
            hkeycallmanagers = hkeysystem + 'c',
            // Regions
            hkeyregions = hkeysystem + 'r',
            // Device Pools
            hkeydevicepools = hkeysystem + 'd',
            // LDAP Directories (Using 'a' for 'Active Directory', since 'l' is better suited for 'Locations')
            hkeyldapdirectory = hkeysystem + 'a',
            // Locations
            hkeylocations = hkeysystem + 'l',
            // Enterprise Parameters
            hkeyenterpriseparameters = hkeysystem + 'e',
            // Service Parameters (Using 'p' for 'Parameters', since 's' is better suited for 'Servers')
            hkeyserviceparameters = hkeysystem + 'p',

        // Call Routing Menu
        hkeycallrouting = hkey + 'c,',

            // Route Patterns (Using 'e' for 'routE', since 'p' is better suited for 'Partitions' and 'r' for 'Route Plan Report')
            hkeyroutepatterns = hkeycallrouting + 'e',
            // Route Lists
            hkeyroutelists = hkeycallrouting + 'l',
            // Route Groups
            hkeyroutegroups = hkeycallrouting + 'g',
            // Paritions
            hkeypartitions = hkeycallrouting + 'p',
            // Calling Search Spaces
            hkeycallingsearchspaces = hkeycallrouting + 'c',
            // Translation Patterns
            hkeytranslationpatterns = hkeycallrouting + 't',
            // Directory Numbers
            hkeydirectorynumbers = hkeycallrouting + 'd',
            // Route Plan Report
            hkeyrouteplanreport = hkeycallrouting + 'r',

        // Device Menu
        hkeydevice = hkey + 'd,',

            // Gateways
            hkeygateways = hkeydevice + 'g',
            // Phones
            hkeyphones = hkeydevice + 'p',
            // Trunks
            hkeytrunks = hkeydevice + 't',
            // Device Defaults
            hkeydevicedefaults = hkeydevice + 'd',
            // Device Profiles (Using 'f' for 'proFiles', since 'd' is better suited for 'Defaults' and 'p' for 'Phones')
            hkeydeviceprofiles = hkeydevice + 'f',
            // Phone Services (Using 'v' for 'serVices', since 's' is better suited for 'SIP Profiles')
            hkeyphoneservices = hkeydevice + 'v',
            // SIP Profiles
            hkeysipprofiles = hkeydevice + 's',

        // User Management Menu
        hkeyusermgmt = hkey + 'u,',

            // Application Users
            hkeyappusers = hkeyusermgmt + 'a',
            // End Users
            hkeyendusers = hkeyusermgmt + 'e',
            // Quick User Phone Add
            hkeyquickphone = hkeyusermgmt + 'q',
            // Access Control Groups
            hkeyaccesscontrolgroups = hkeyusermgmt + 'g',
            // UC Services
            hkeyucservices = hkeyusermgmt + 'u',
            // Service Profiles
            hkeyserviceprofiles = hkeyusermgmt + 's',

        // Help Menu
        hkeyhelp = hkey + 'h,',

            // About
            hkeyabout = hkeyhelp + 'a';

function hotkeys(e) {
    console.log(e.key);
    hkeys.push(e.key);
    console.log(hkeys.toString());
    switch (hkeys.toString())) {
        case hkeyphones:
            hotkeysgo('./phoneFindList.do');
            break;
        default:
            break;
    }
}

function hotkeygo(href) {
    hkeys = [];
    console.log('Goto: ' + href);
    window.location.href = href;
}

//var body = document.getElementByTagName('body')[0];
window.addEventListener('keypress', hotkeys, true);

// ============================================================================
// This is where we clean up the web pages
// ============================================================================

// ----------------------------------------------------------------------------
// Applies to All Pages
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Applies to Device > Phone Search Page
// ----------------------------------------------------------------------------
if (/phoneFindList.do/.test(url)) {
    var form = document.forms.namedItem('phoneFindListForm');
    if (form) {
        var query = form.elements.namedItem('searchString0');
        if (query.value == '') {
            var field = form.elements.namedItem('searchField0');
            var limit = form.elements.namedItem('searchLimit0');
            if (field) {
                field.value = 'device.description';
            }
            if (limit) {
                limit.value = 'contains';
            }
        }
        query.focus();
    }
}

// ----------------------------------------------------------------------------
// Applies to Phone Configuration Page
// ----------------------------------------------------------------------------
if (/phoneEdit.do/.test(url)) {
    var form = document.forms.namedItem('phoneForm');
    if (form) {
        /* This section defaults the user to anon for new phone adds */
        var enduser = form.elements.namedItem('fkenduser');
        if (enduser.value == '') {
            var owner_userid = form.elements.namedItem('userphoner');
            owner_userid.value = '0';
            enduser.disabled = true;
        }
        /* This section increases the size of the days of the week from 3 to 7 */
        var days_active = form.elements.namedItem('productSpecific[7].multiKeyFieldValue');
        if (days_active) {
            days_active.size = 7;
        }
    }
}