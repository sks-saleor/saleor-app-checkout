
include .env

export PROJECT_NAME=sks-saleor
export STOREFRONT_VERSION=latest
export DJANGO_VERSION=latest
export DASHBOARD_VERSION=latest

DB_CONTAINER_NAME=postgres

.PHONY: up build down ps logs backup restore backups

## help	:	Print commands help.
help : Makefile
	@sed -n 's/^##//p' $<

## storefront-build:	You should build your tests to provide the highest level of code coverage.
storefront-build:
	@echo "storefront-build storefront image for storefront..."
	@docker build --platform linux/x86_64 -f compose/storefront/Dockerfile -t saleor-storefront:$(STOREFRONT_VERSION) .
	@echo "storefront-build add tag storefront..."
	@docker tag saleor-storefront:$(STOREFRONT_VERSION) ghcr.io/sks-keo/saleor-storefront:$(STOREFRONT_VERSION)
	@echo "start pushing storefront to ghcr..."
	@docker push ghcr.io/sks-keo/saleor-storefront:$(STOREFRONT_VERSION)

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
