class Widget {
	constructor(elem) {
		this.$elem  = $(elem);
		this.$clock = this.$elem.find('.clock');

		this.sync();
		this.trigger();
	}

	sync() {
		if(typeof this.$clock.attr('data-time-offset') == 'undefined') {
			const serverTime = parseInt(this.$clock.attr('data-server-time'));
			const localTime = Date.now();

			const timeOffset = serverTime - localTime;
			this.$clock.attr('data-time-offset', timeOffset);
			this.$clock.removeAttr('data-server-time');
		}
	}

	trigger() {
		const clockOffset  = parseInt(this.$clock.attr('data-time-offset'));
		const hourDigit0   = this.$clock.find('.clock-digit#hour-digit-0');
		const hourDigit1   = this.$clock.find('.clock-digit#hour-digit-1');
		const minuteDigit0 = this.$clock.find('.clock-digit#minute-digit-0');
		const minuteDigit1 = this.$clock.find('.clock-digit#minute-digit-1');
		const secondDigit0 = this.$clock.find('.clock-digit#second-digit-0');
		const secondDigit1 = this.$clock.find('.clock-digit#second-digit-1');

		const unix = new Date(Date.now()+clockOffset);

		const seconds = ('0' + Math.round(unix.getSeconds() + unix.getMilliseconds()/1000)).slice(-2);
		const minutes = ('0' + unix.getMinutes()).slice(-2);
		const hours = ('0' + unix.getHours()).slice(-2);

		secondDigit0.html(seconds.split('')[0]);
		secondDigit1.html(seconds.split('')[1]);

		minuteDigit0.html(minutes.split('')[0]);
		minuteDigit1.html(minutes.split('')[1]);

		hourDigit0.html(hours.split('')[0]);
		hourDigit1.html(hours.split('')[1]);

		setTimeout(() => {
			this.trigger();
		}, 1000/2);
	}
}