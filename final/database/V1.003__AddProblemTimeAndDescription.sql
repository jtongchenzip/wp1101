alter table problem
	add column  start_time	 timestamp,
	add column  end_time	 timestamp,
	add column  description	 varchar;

-- manual insert value to existing accounts

alter table problem
	alter column start_time  set not null,
	alter column end_time    set not null;