/* global malarkey:false, moment:false, _:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';

angular.module('flightSearch', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngMessages', 'ngAria', 'ngRoute', 'toastr'])
.constant('moment', moment)
.config(config)
.config(routerConfig)
.run(runBlock)
.service('githubContributor', GithubContributorService)
.controller('MainController', MainController)
// .constant('malarkey', malarkey)
.service('webDevTec', WebDevTecService)
// .directive('acmeNavbar', NavbarDirective)
// .directive('acmeMalarkey', MalarkeyDirective);
