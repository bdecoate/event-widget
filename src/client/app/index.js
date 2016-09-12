import ko from 'knockout';

// Import dependencies for webpack to build the output
import './upcoming-events/main';
import './upcoming-events/resource';
import '../style/style.less';

// Initialize knockout, no need to explicitly set a viewmodel because the
//	custom elements will take care of themselves
ko.applyBindings();
