<div class="clock-wrapper">
	<div class="clock" data-server-time="<?php echo(microtime(true)*1000); ?>">
		<div class="clock-hand clock-second-hand"></div>
		<div class="clock-hand clock-minute-hand"></div>
		<div class="clock-hand clock-hour-hand"></div>
		<div class="clock-dot"></div>
		<?php 
			$dashes = 12;
			for ($i=0; $i < $dashes; $i++) { 
				$rotation = ($i/$dashes)*360;
				echo("<div class='clock-dash clock-dash-{$i}' style='transform: rotate({$rotation}deg);'></div>");
			}
		?>
	</div>
</div>