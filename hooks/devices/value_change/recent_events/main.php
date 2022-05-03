<?php 
    // Get recent events list (use an empty array as fallback if it was not found)
    $recent_events = $HOOK->extension->getData('recent_events') ?? array();
    
    // Add this event to the recent events list
    array_push($recent_events, [
        'time'    => date('c'),
        'event'   => 'devices/value_change',
        'related' => [
            'device_id'          => $HOOK->deviceId,
            'device_value'       => $HOOK->deviceValue,
            'device_shown_value' => $HOOK->deviceShownValue
        ]
    ]);

    // Only keep last 5 recent events
    $recent_events = array_slice($recent_events, -5);

    // Save the new list
    $HOOK->extension->saveData('recent_events', $recent_events);
?>