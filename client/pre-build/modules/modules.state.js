app.config(function ($stateProvider) {
    $stateProvider.state('images', {
        url: '/images',
        templateUrl: '/pre-build/modules/images.html',
        controller: 'ModulesController'
    });
});