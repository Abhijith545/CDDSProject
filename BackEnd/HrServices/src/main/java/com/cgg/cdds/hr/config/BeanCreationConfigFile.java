package com.cgg.cdds.hr.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanCreationConfigFile {
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
