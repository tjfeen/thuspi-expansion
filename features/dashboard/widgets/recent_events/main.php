<?php 
	// Extension class
	$extension = new \thusPi\Extensions\Extension(EXTENSION_ID);

	$recent_events = array_reverse($extension->getData('recent_events') ?? []);
?>
<div class="activities">
	<?php foreach ($recent_events as $event) : ?>
		<?php 
			// Device class
			switch($event['event']) {
				case 'devices/value_change':
					$device = new \thusPi\Devices\Device($event['related']['device_id']);

					// Continue if device does not exist (anymore)
					if(is_null($device->getProperties())) {
						continue 2;
					}

					if($event['related']['device_value'] == 'on' || $event['related']['device_value'] == 'off') {
						$event_description = $extension->translate(
							"features.dashboard/widgets.recent_events.event.device_toggled_{$event['related']['device_value']}", 
							[$device->getProperty('name')]
						);
					} else {
						$event_description = $extension->translate(
							'features.dashboard/widgets.recent_events.event.device_changed', 
							[$device->getProperty('name'), $event['related']['device_shown_value'] ?? $event['related']['device_value']]
						);
					}
					
					break;
				
				default:
					$event_description = '';
			}
		?>
		<div class="activity">
			<div class="activity-description"><?php echo($event_description); ?></div>
			<div class="activity-time text-muted"><?php echo(\thusPi\Locale\date_format('best,best', $event['time'])); ?></div>
		</div>
	<?php endforeach; ?>
</div>