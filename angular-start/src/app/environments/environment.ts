export const environment = {
    production: true,
    appExpenses: 'http://127.0.0.1:8080',
    services: {
        auth: {
            login: '/auth/login'
        },
        typeCategories: {
            listTypeCategories: '/api/v1/types/'
        }
        ,
        categories: {
            listCategories: '/api/v1/categories/#pageNo/#pageSize',
            deleteCategory: '/api/v1/categories/#categoryId',
            createCategory: '/api/v1/categories',
            updateCategory: '/api/v1/categories'
        },
        records: {
            listRecords: '/api/v1/records/#pageNo/#pageSize',
            create: '/api/v1/records/',
            deleteRecord: '/api/v1/records/#recordId',
            updateRecord: '/api/v1/records/',
            filterRecords: '/api/v1/records/filters/#pageNo/#pageSize'
        },
        stadistics: {
            balances: '/api/v1/stadistics/balances',
            amounts: '/api/v1/stadistics/amounts',
            expenses: '/api/v1/stadistics/expenses',
            amountsWeek: '/api/v1/stadistics/week_amounts',
            expensesWeek: '/api/v1/stadistics/week_expenses',

        }
    },
};
