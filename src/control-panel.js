import {
    Dispatcher,
    Store
} from './flux';

const controlPanelDispatcher = new Dispatcher();

$(function () {

    class getNomineeStore extends Store {

        getInitialState(cb) {
            $.ajax({
                url: 'http://localhost:3000/nomineeList',
                method: 'get',
                contentType: 'application/json',
                success: (res) => {
                    this.__state = res;
                    cb(this.__state);
                }
            });
        }

    }
    const render = (state) => {

        $('#countTable').dataTable({
            searching: false,
            ordering: false,
            info: false,
            paging: true,
            lengthChange: false,
            serverSide: false,
            pagingType: 'full_numbers',
            pageLength: 10,
            autoWidth: false,
            language: {
                paginate: {
                    first: '&ll;',
                    previous: '&lt;',
                    next: '&gt;',
                    last: '&gg;'
                }
            },
            data: state,
            columns: [{
                    'render': function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                }, {
                    'data': 'name'
                },
                {
                    'data': 'nominatedBy'
                },
                {
                    'data': 'status'
                }, {
                    'render': function (data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="">View</a>';
                        }

                        return data;
                    },

                }
            ]
        });
    };
    const nomineeStore = new getNomineeStore(controlPanelDispatcher);
    nomineeStore.getInitialState((nominee) => {
        render(nominee);
    });
})