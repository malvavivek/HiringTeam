import {
    Dispatcher,
    Store
} from './flux';

const controlPanelDispatcher = new Dispatcher();

$(function () {

    class getNomineeStore extends Store {

        getInitialState(cb) {
            $.ajax({
                url: "http://localhost:3000/data",
                method: 'get',
                contentType: 'application/json',
                success: (res) => {
                    this.__state = res.nomineeList;
                    cb(this.__state);
                }
            });
        }

    }
    const render = (state) => {
        $("#countTable").dataTable({
            // "bProcessing": true,
            // "bServerSide": true,
            // "sAjaxSource": "http://localhost:3000/data",
            // "sServerMethod": "GET",
            // "columns": [{
            //         "nomineeList": "name"
            //     },
            //     {
            //         "nomineeList": "nominatedBy"
            //     },
            //     {
            //         "nomineeList": "status"
            //     },
            // ],
            // "bPaginate": true,
            // // "bInfo": false,
            // // "bFilter": false,
            // // "bLengthChange": false,
            // // "bSort": false,
            // "sPaginationType": "full_numbers",
            // "pageLength": 5
            searching: false,
            ordering: false,
            paging:true,
            serverSide:true,
            "ajax": {
                "url": "http://localhost:3000/data",
                "type": "GET"
              }
        });

        $('.first').text('').append('<i class="fa fa-angle-double-left" aria-hidden="true"></i>');
        $('.previous').text('').append('<i class="fa fa-angle-left" aria-hidden="true"></i>');
        $('.next').text('').append('<i class="fa fa-angle-right" aria-hidden="true"></i>');
        $('.last').text('').append('<i class="fa fa-angle-double-right" aria-hidden="true"></i>');
        const template = $('.nominee-details');
        $('.nominee-details').remove();
        let i = 1;
        // var table = $('#countTable').DataTable();
        // table.clear().draw();
        state.forEach((nominee) => {
            let nomineeRow = template.clone();
            nomineeRow.find('.serial-no').html(`${i++}`);
            nomineeRow.find('.nominee-name').html(`${nominee.name}`);
            nomineeRow.find('.nominated-by').html(nominee.nominatedBy);
            nomineeRow.find('.assessment-status').html(nominee.status);
            nomineeRow.appendTo('.nominee-table');
        });
    };
    const nomineeStore = new getNomineeStore(controlPanelDispatcher);
    nomineeStore.getInitialState((nominee) => {
        render(nominee);
    });

})