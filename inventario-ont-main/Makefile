# Nombre del archivo Makefile: Makefile

# Comando predeterminado que se ejecutará cuando solo se llame `make`
default: help

# Objetivo para agregar, confirmar y enviar cambios a Git
commit:
	@read -p "Enter your commit message: " MESSAGE; \
	git add .; \
	git commit -m "$$MESSAGE"; \
	#git pull
	git push

# Objetivo de ayuda que muestra las opciones disponibles
help:
	@echo "Uso: make <comando>"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  commit  Agrega, confirma y envía los cambios a Git (requiere ingresar un mensaje de confirmación)"

install:
	npm install -g lite-server # npm install -g http-server
	npm install -g @angular/cli
	npm install --force

run:
	ng build
	lite-server &
	#ng serve --host 0.0.0.0 --port 22000
run2:
	#ng build
	#lite-server
	ng serve --host 10.78.30.46 --port 40001


pull:
	git pull
.PHONY: help commit install run pull
