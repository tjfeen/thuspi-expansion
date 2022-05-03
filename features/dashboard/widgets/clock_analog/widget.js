class Widget {
    constructor(elem) {
		this.$elem  = $(elem);
        this.$clock = this.$elem.find('.clock');

		this.sync();
		this.trigger();
	}

    sync() {
		if(typeof this.$clock.attr('data-time-offset') == 'undefined') {
			const server_time = parseInt(this.$clock.attr('data-server-time'));
			const local_time = Date.now();

			const timeOffset = server_time - local_time;
			this.$clock.attr('data-time-offset', timeOffset);
			this.$clock.removeAttr('data-server-time');
		}
    }
    
    trigger() {
        const clockOffset = parseInt(this.$clock.attr('data-time-offset'));
        const secondHand  = this.$clock.find('.clock-second-hand');
        const minuteHand  = this.$clock.find('.clock-minute-hand');
        const hourHand    = this.$clock.find('.clock-hour-hand');

        const unix = new Date(Date.now()+clockOffset);

        const milliseconds = unix.getMilliseconds();

        const seconds = unix.getSeconds() + milliseconds/1000;
        const secondsDeg = (seconds/60*360)-90;
        secondHand.css({transform: `rotate(${secondsDeg}deg)`});

        const minutes = unix.getMinutes() + seconds/60;
        const minutesDeg = (minutes/60*360)-90;
        minuteHand.css({transform: `rotate(${minutesDeg}deg)`});

        const hours = unix.getHours() + minutes/60;
        const hoursDeg = (hours/12*360)-90;
        hourHand.css({transform: `rotate(${hoursDeg}deg)`});
        
        setTimeout(() => {
            this.trigger();
        }, 1000/20);
    }
}