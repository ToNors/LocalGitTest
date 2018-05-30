var debug = false;
// var uri = 'http://localhost:43889/rts27/v1'; // VS http
// var uri = 'https://localhost:44330/rts27/v1'; // VS https
var uri = 'http://localhost:5000/rts27/v1'; // CLI Publish Localhost
// var uri = 'http://B5982051:5000/rts27/v1'; // CLI Publish Local computername

// var uri = 'http://wsp1713c:5000/rts27/v1'; // CLI Publish SysTest Funkar ej
//var uri = 'http://pws-system.sebank.se:5000/rts27/v1'; // CLI Publish SysTest Funkar ej
//var uri = 'http://wsp1713c/rts27/v1'; // CLI Publish SysTest Funkar ej
//var uri = 'http://pws-system.sebank.se/rts27/v1'; // CLI Publish SysTest Funkar ej

// var uri = 'http://localhost:43890/rts27/v1'; // CLI Run
var initSelection = 'Select';
var defaultVenueName = 'SEB AB';

function debugLog(message) {
    if (debug) { console.log(message); }
}

$(document).ready(function () {

    jQuery.support.cors = true;
    var options = '';

    $('#selectVenueName').change(
        function () {
            debugLog('selectVenueName.change');
            // Clear closest child
            $('#selectVenueType').empty();
            // If own value is selected (not empty and not 'Select')
            if ($('#selectVenueName option:selected').text().replace(initSelection, '') == '') {
                // Disable closest child
                $('#selectVenueType').prop('disabled', true);
            }
            else {
                // Enable closest child
                $('#selectVenueType').prop('disabled', false);
                // Load closest child
                var query = uri
                    + '/document-property-venue-types'
                    + '?venue_name='
                    + $('#selectVenueName option:selected').text();
                debugLog(query);
                $.getJSON(query)
                    .done(function (json) {
                        var options = '<option>' + initSelection + '</option>';
                        for (var i = 0; i < json.result.document_property_venue_types.length; i++) {
                            options += '<option title=\'' + json.result.document_property_venue_types[i] + '\'>' + json.result.document_property_venue_types[i] + '</option>';
                        }
                        $('#selectVenueType').append(options);
                        $('#selectVenueType').prop('selectedIndex', 0);
                    });
            }
            // Trigger change of closest child
            $('#selectVenueType').trigger('change');
        });

    $('#selectVenueType').change(
        function () {
            debugLog('selectVenueType.change');
            // Clear closest child
            $('#selectReportPeriod').empty();
            // If own value is selected (not empty and not 'Select')
            if ($('#selectVenueType option:selected').text().replace(initSelection, '') == '') {
                // Disable closest child
                $('#selectReportPeriod').prop('disabled', true);
            }
            else {
                // Enable closest child
                $('#selectReportPeriod').prop('disabled', false);
                // Load closest child
                var query = uri
                    + '/document-property-reporting-periods'
                    + '?venue_name='
                    + $('#selectVenueName option:selected').text()
                    + '&venue_type='
                    + $('#selectVenueType option:selected').text();
                debugLog(query);
                $.getJSON(query)
                    .done(function (json) {
                        var options = '<option>' + initSelection + '</option>';
                        for (var i = 0; i < json.result.document_property_reporting_periods.length; i++) {
                            options += '<option title=\'' + json.result.document_property_reporting_periods[i] + '\'>' + json.result.document_property_reporting_periods[i] + '</option>';
                        }
                        $('#selectReportPeriod').append(options);
                        $('#selectReportPeriod').prop('selectedIndex', 0);
                        $('#selectReportPeriod').focus();
                    });
            }
            // Trigger change of closest child
            $('#selectReportPeriod').trigger('change');
        });

    $('#selectReportPeriod').change(
        function () {
            debugLog('selectReportPeriod.change');
            // Clear closest child
            $('#selectReportGroup').empty();
            // If own value is selected (not empty and not 'Select')
            if ($('#selectReportPeriod option:selected').text().replace(initSelection, '') == '') {
                // Disable closest child
                $('#selectReportGroup').prop('disabled', true);
            }
            else {
                // Enable closest child
                $('#selectReportGroup').prop('disabled', false);
                // Load closest child
                var query = uri
                    + '/document-property-report-groups'
                    + '?venue_name='
                    + $('#selectVenueName option:selected').text()
                    + '&venue_type='
                    + $('#selectVenueType option:selected').text()
                    + '&report_period='
                    + $('#selectReportPeriod option:selected').text();
                debugLog(query);
                $.getJSON(query)
                    .done(function (json) {
                        var options = '<option>' + initSelection + '</option>';
                        for (var i = 0; i < json.result.document_property_report_groups.length; i++) {
                            options += '<option title=\'' + json.result.document_property_report_groups[i] + '\'>' + json.result.document_property_report_groups[i] + '</option>';
                        }
                        $('#selectReportGroup').append(options);
                        $('#selectReportGroup').prop('selectedIndex', 0);
                        $('#selectReportGroup').focus();
                    });
            }
            // Trigger change of closest child
            $('#selectReportGroup').trigger('change');
        });

    $('#selectReportGroup').change(
        function () {
            debugLog('selectReportGroup.change');
            // Clear closest child
            $('#selectFileName').empty();
            // If own value is selected (not empty and not 'Select')
            if ($('#selectReportGroup option:selected').text().replace(initSelection, '') == '') {
                // Disable closest child
                $('#buttonSearch').prop('disabled', true);
                $('#divFileName').hide();
                $('#listFileName').empty();
            }
            else {
                // Enable closest child
                $('#buttonSearch').prop('disabled', false);
                // Load closest child
                var query = uri
                    + '/document-property-identifiers'
                    + '?venue_name='
                    + $('#selectVenueName option:selected').text()
                    + '&venue_type='
                    + $('#selectVenueType option:selected').text()
                    + '&report_period='
                    + $('#selectReportPeriod option:selected').text()
                    + '&report_group='
                    + $('#selectReportGroup option:selected').text();
                debugLog(query);
                $.getJSON(query)
                    .done(function (json) {
                        var options = '';
                        for (var i = 0; i < json.result.document_property_identifiers.length; i++) {
                            options += '<option value=\'' + json.result.document_property_identifiers[i].id + '\' title=\'' + json.result.document_property_identifiers[i].file_name + '\'>' + json.result.document_property_identifiers[i].file_name + '</option>';
                        }
                        $('#selectFileName').append(options);
                        $('#selectFileName').prop('selectedIndex', 0);

                        if ($('#selectFileName option:selected').text().replace(initSelection, '') == '') {
                            // Disable closest child
                            $('#buttonSearch').prop('disabled', true);
                        }
                        else {
                            // Enable closest child
                            $('#buttonSearch').prop('disabled', false);
                        }
                        $('#buttonSearch').focus();
                    });
            }
            // Trigger change of closest child
            $('#selectFileName').trigger('change');
        });

    $('#selectFileName').change(
        function () {
            debugLog('selectFileName.change');
            // If own value is selected (not empty and not 'Select')
            if ($('#selectFileName option:selected').text().replace(initSelection, '') == '') {
                // Disable closest child
                $('#buttonSearch').prop('disabled', true);
                $('#buttonDownLoad').prop('disabled', true);
                $('#buttonDownLoad').hide();
            }
            else {
                // Enable closest child
                $('#buttonSearch').prop('disabled', false);
                $('#buttonDownLoad').prop('disabled', false);
                $('#buttonDownLoad').show();
                $('#buttonDownLoad').focus();
            }
        });

    $("#buttonSearch").click(function () {
        $('#listFileName').empty();
        $('#listFileName').append($('#selectFileName option:selected').text().replace(new RegExp('_', 'g'), '-'));
        $('#divFileName').show();
        $('#buttonDownLoad').show();
        $('#buttonDownLoad').prop('disabled', false);
        $('#buttonDownLoad').focus();
    });

    $("#buttonDownLoad").click(function () {
        var query = uri
            + '/documents'
            + '/'
            + $('#selectFileName option:selected').val();
        debugLog(query);
        $.getJSON(query)
            .done(function (json) {
                debugLog('Filename: ' + $('#selectFileName option:selected').text() + '\nContent:  ' + json.result.document.report);
                download(json.result.document.report, $('#selectFileName option:selected').text(), "text/xml");
            });
    });

    debugLog('document.ready');
    var query = uri
        + '/document-property-venue-names';
    debugLog(query);
    $.getJSON(query)
        .done(function (json) {
            var options = '<option>' + initSelection + '</option>';
            for (var i = 0; i < json.result.document_property_venue_names.length; i++) {
                options += '<option title=\'' + json.result.document_property_venue_names[i] + '\'>' + json.result.document_property_venue_names[i] + '</option>';
            }
            // Clear VenueName
            $('#selectVenueName').empty();
            // Load VenueName
            $('#selectVenueName').append(options);
            // Disable if Venuename is empty
            $('#selectVenueName').prop('disabled', $('#selectVenueName option:selected').text() == '');
            // Set defaultVenueName default if exists
            $('#selectVenueName option:contains("' + defaultVenueName + '")').attr('selected', 'selected');
            // Trigger VenurName.change
            $('#selectVenueName').trigger('change');
            $('#selectVenueType').focus();
        });
});