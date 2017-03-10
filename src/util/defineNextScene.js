import { SCENES, ROUTE as routeTo } from '../constants/Scenes'

export function pricing(curentScene, nextSceneHelper){
  switch(curentScene){
    case SCENES.CreatePost:
      return routeTo[SCENES.DataScraping]

    case SCENES.DataScraping:
      return routeTo[SCENES.Options]

    case SCENES.Options:
      if(nextSceneHelper) {
        return routeTo[SCENES.Pricing]
      } else {
        return routeTo[SCENES.MoreInfo]
      }

    case SCENES.MoreInfo:
      return routeTo[SCENES.Pricing]

    case SCENES.Pricing:
      if(nextSceneHelper.loggedIn){
        if(ifRegisteredSeller()) {
          return routeTo[SCENES.PostScreen]
        } else {
          return routeTo[SCENES.RegisterSeller]
        }
      } else {
        return routeTo[SCENES.OAuthLogin]
      }

    case SCENES.OAuthLogin:
      return routeTo[SCENES.WelcomeScreen]

    case SCENES.WelcomeScreen:
      return routeTo[SCENES.RegisterSeller]

    case SCENES.RegisterSeller:
      if(ifHavePayPalAccount()) {
        return routeTo[SCENES.PostScreen]
      } else {
        return null
      }

    case SCENES.PostScreen:
      return routeTo[SCENES.CompletePostScreen]

    case SCENES.CompletePostScreen:
      return null
  }
}

export function search(curentScene, nextSceneHelper) {
  switch (curentScene) {
    case SCENES.Start:
      if(skipOnboardBuyer()) {
        return routeTo[SCENES.SearchFilter]
      } else {
        return routeTo[SCENES.ShowCuratedProduct]
      }
    case SCENES.SearchFilter:
      return routeTo[SCENES.Search]

    case SCENES.Search:
      return routeTo[SCENES.ShowCuratedProduct]

    case SCENES.ShowCuratedProduct:
      if(nextSceneHelper.loggedIn) { // condition
        return null // Checkout(ProductAddToCart)
      } else {
        return null // Sell
      }
  }
}

export function checkout(curentScene, nextSceneHelper) {
  switch (curentScene) {
    case SCENES.ProductAddToCart:
      return routeTo[SCENES.Checkout]

    case SCENES.Checkout:
      return routeTo[SCENES.EnterNameAddress]

    case SCENES.EnterNameAddress:
      return routeTo[SCENES.EnterPaymentInfoPurchase]

    case SCENES.EnterPaymentInfoPurchase:
      return null
  }
}

export function splash(curentScene, nextSceneHelper) {
  console.log('defineNextSceneSplash', curentScene.s(), nextSceneHelper)
  switch(curentScene){
    case SCENES.Splash:
      if(nextSceneHelper) {
        if(skipOnboardBuyer()){
          return routeTo[SCENES.TabContainer]
        }else{
          return routeTo[SCENES.ChildAge]
        }
      } else {
        return routeTo[SCENES.OAuthLogin]
      }
    case SCENES.OAuthLogin:
      return routeTo[SCENES.TabContainer] // based on the GBG - Flow Charts - MVP - Summary Flow .pdf from 20.02.2017
    //return routeTo[SCENES.WelcomeScreen]

    case SCENES.WelcomeScreen:
      if(nextSceneHelper.isContinue){
        return routeTo[SCENES.ChildAge]
      } else {
        return routeTo[SCENES.TabContainer]
      }

    // --Onboard Buyer--
    case SCENES.ChildAge:
      if(nextSceneHelper.isContinue) {
        return routeTo[SCENES.ChildGender]
      } else {
        return routeTo[SCENES.TabContainer]
      }
    case SCENES.ChildGender:
      if(nextSceneHelper.isContinue) {
        return routeTo[SCENES.GearKind]
      } else {
        return routeTo[SCENES.TabContainer]
      }
    case SCENES.GearKind:
      if(nextSceneHelper.isContinue) {
        return routeTo[SCENES.LocationPrompt]
      } else {
        return routeTo[SCENES.TabContainer]
      }
    case SCENES.LocationPrompt:
      if(nextSceneHelper.isContinue) {
        return routeTo[SCENES.Location]
      } else {
        return routeTo[SCENES.TabContainer]
      }
    case SCENES.Location:
      return routeTo[SCENES.TabContainer]
  }
}


function ifHavePayPalAccount(){
  return true
}

function skipOnboardBuyer(){
  return true
}

function ifRegisteredSeller() {
  return false
}
