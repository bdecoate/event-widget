import _ from 'lodash';
import $ from 'jquery';
import Q from 'q';
import ko from 'knockout'
import moment from 'moment';

export default class Resource {
	constructor(params){
		// observable of current date filter
		this.cur_filter = params.filter;

		// the event field that contains the date we want
		this.date_key = params.resource.filter;

		// observables for the name of this resource and and event values
		this.name = ko.observable(params.resource.name);
		this.values = ko.observableArray();

		// Set computed functions for creating the display name and url
		this.display_name = ko.computed(this._display_name.bind(this));
		this.url = ko.computed(() => `/${this.name()}`);

		// Retrieve data from server using the promise
		//	augment the values to create a Moment instance from the date
		//	and a rudimentary display name for the event
		this._get_values().then(data => {
			this.values(_.map(data, val => {
				let display = _.values(_.omit(val, 'id')).join(', ');
				val.display = display;
				val.date = moment(_.get(val, this.date_key), 'MM/DD/YYYY');
				return val;
			}));
		});

		// Filter out resources which are valid within current date range
		this.filtered_values = ko.computed(() => {
			return ko.utils.arrayFilter(this.values(), val => {
				let future = this.cur_filter().date;
				let range = -1 * this.cur_filter().diff;
				let diff = val.date.diff(future, 'days');
				return range <= diff && diff <= 0;
			})
		});
	}

	// Pretty format the name for display within the component
	_display_name() {
		var first_char = this.name().charAt(0);
		return `${first_char.toUpperCase()}${this.name().slice(1)}`;
	}

	// Create promise for fetching data for this resource
	_get_values() {
		return Q($.get(this.url()));
	}

	// Return the total number of resources valid within current date range
	get total() {
		if(_.isEmpty(this.values())){
			return 0;
		}
		return _.size(this.filtered_values());
	}
}

// Register the component with knockout to allow creating custom elements
ko.components.register('resource', {
	viewModel: Resource,
	template: require('text!./resource.component.ejs')
});
