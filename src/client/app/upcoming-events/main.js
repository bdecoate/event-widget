import ko from 'knockout';
import moment from 'moment';

export default class UpcomingEventsViewModel {
	constructor(params){
		// resources passed from ejs template to be used for creating the
		//	four events displays
		this.resources = ko.observableArray(params.resources);

		// Initialize the date filters to be used for the range tabs
		this.filters = ko.observableArray([
			{
				display: 'TODAY', active: ko.observable(false),
				memo: 'Today', diff: 1,
				date: moment().add(1, 'days').startOf('day')
			},
			{
				display: '7 DAY', active: ko.observable(true),
				memo: 'Next 7 days', diff: 8,
				date: moment().add(8, 'days').startOf('day')
			},
			{
				display: '30 DAY', active: ko.observable(false),
				memo: 'Next 30 days', diff: 31,
				date: moment().add(31, 'days').startOf('day')
			},
		]);
		this.current_filter = ko.observable(this.filters()[1]);
	}

	// Click handler for the date range tabs
	set_active(filter){
		this.current_filter().active(false);
		filter.active(true);
		this.current_filter(filter);
	}
}


// Register the component with knockout to allow creating custom elements
ko.components.register('upcoming-events', {
	viewModel: UpcomingEventsViewModel,
	template: require('text!./main.component.ejs')
});
