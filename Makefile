#
# Makefile
#sudo lsof -i -P -n | grep LISTEN
list:
	sudo lsof -i -P -n | grep LISTEN
killservers:
		@echo "Buscando procesos de lite-server..."
		@lite_server_processes=$$(pgrep -f "lite-server"); \
		if [ -n "$$lite_server_processes" ]; then \
		    echo "Procesos de lite-server encontrados. Matando los procesos..."; \
			echo "$$lite_server_processes"; \
		    kill $$lite_server_processes; \
		    echo "Procesos de lite-server han sido terminados."; \
		else \
		    echo "No se encontraron procesos de lite-server en ejecución."; \
		fi


run:
	make -C /var/www/html/inventario-back-front/nestjs-app-invetario-main run #node /var/www/html/inventario-back-front/nestjs-app-invetario-main/dist/main.js --port 3000 --host 0.0.0.0 
	make -C /var/www/html/inventario-back-front/inventario-ont-main run

runback:
	make -C /var/www/html/inventario-back-front/nestjs-app-invetario-main run2 #node /var/www/html/inventario-back-front/nestjs-app-invetario-main/dist/main.js --port 3000 --host 0.0.0.0 
runfront:
	make -C /var/www/html/inventario-back-front/inventario-ont-main run2