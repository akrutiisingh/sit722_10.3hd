resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_service_plan" "plan" {
  name                = "sit722-app-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "S1" # Required for deployment slot routing
}

resource "azurerm_linux_web_app" "app" {
  name                = "aks-canary-app"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    always_on = true
  }
}

resource "azurerm_linux_web_app_slot" "canary" {
  name           = "canary"
  app_service_id = azurerm_linux_web_app.app.id

  site_config {
    always_on = true
  }
}