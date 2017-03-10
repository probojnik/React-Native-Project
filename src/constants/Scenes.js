import Enum from '../util/enum'

export const SCENES = Enum(
  "Back",
  "Start",

  "Splash", // my_idea

  // --Sell(Pricing)--
  "CreatePost", // S_3
  "DataScraping", // S_4
  "Options", // S_5
  "MoreInfo", // S_6b
  "Pricing", // S_6a
  "OAuthLogin", // S_L2a
  "WelcomeScreen", // S_L3, L_3
  "RegisterSeller", // S_7a
  "PostScreen", // S_7b
  "CompletePostScreen", // S_8


  // --Onboard Buyer--
  "ChildAge", // L_4
  "ChildGender", // L_5
  "GearKind", // L_6
  "LocationPrompt", // L_7
  "Location", // L_7b

  "TabContainer",

  // --Search
  "SearchFilter", // H_0
  "Search", // H_0b
  "ShowCuratedProduct", // H_1

  // --Checkout
  "ProductAddToCart", // B_2
  "Checkout", // B_3
  "EnterNameAddress", // B_4
  "EnterPaymentInfoPurchase", // B_5
)

export const ROUTE = {
  [SCENES.Back] : {
    type: 'pop',
  },
  [SCENES.Start]: {
    type: 'push',
    route: {
      key: SCENES.Start.toString(),
      title: null
    }
  },

  [SCENES.CreatePost] : {
    type: 'push',
    route: {
      key: SCENES.CreatePost.toString(),
      title: 'CREATE POST'
    }
  },
  [SCENES.DataScraping] : {
    type: 'push',
    route: {
      key: SCENES.DataScraping.toString(),
      title: 'PROCESSING'
    }
  },
  [SCENES.Options] : {
    type: 'push',
    route: {
      key: SCENES.Options.toString(),
      title: 'OPTIONS'
    }
  },
  [SCENES.MoreInfo] : {
    type: 'push',
    route: {
      key: SCENES.MoreInfo.toString(),
      title: 'MORE INFO'
    }
  },
  [SCENES.Pricing] : {
    type: 'push',
    route: {
      key: SCENES.Pricing.toString(),
      title: 'PRICING'
    }
  },
  [SCENES.OAuthLogin] : {
    type: 'push',
    route: {
      key: SCENES.OAuthLogin.toString(),
      title: null
    }
  },
  [SCENES.WelcomeScreen] : {
    type: 'push',
    route: {
      key: SCENES.WelcomeScreen.toString(),
      title: null
    }
  },
  [SCENES.RegisterSeller] : {
    type: 'push',
    route: {
      key: SCENES.RegisterSeller.toString(),
      title: 'PROFILE'
    }
  },
  [SCENES.PostScreen] : {
    type: 'push',
    route: {
      key: SCENES.PostScreen.toString(),
      title: 'PREVIEW'
    }
  },
  [SCENES.CompletePostScreen] : {
    type: 'push',
    route: {
      key: SCENES.CompletePostScreen.toString(),
      title: 'SHARE LISTING'
    }
  },

  [SCENES.Splash] : {
    type: 'push',
    route: {
      key: SCENES.Splash.toString(),
      title: 'SPLASH'
    }
  },

  [SCENES.ChildAge] : {
    type: 'push',
    route: {
      key: SCENES.ChildAge.toString(),
      title: null
    }
  },
  [SCENES.ChildGender] : {
    type: 'push',
    route: {
      key: SCENES.ChildGender.toString(),
      title: null
    }
  },
  [SCENES.GearKind] : {
    type: 'push',
    route: {
      key: SCENES.GearKind.toString(),
      title: null
    }
  },
  [SCENES.LocationPrompt] : {
    type: 'push',
    route: {
      key: SCENES.LocationPrompt.toString(),
      title: null
    }
  },
  [SCENES.Location] : {
    type: 'push',
    route: {
      key: SCENES.Location.toString(),
      title: null
    }
  },

  [SCENES.TabContainer] : {
    type: 'push',
    route: {
      key: SCENES.TabContainer.toString(),
      title: null
    }
  },

  [SCENES.SearchFilter] : {
    type: 'push',
    route: {
      key: SCENES.SearchFilter.toString(),
      title: null
    }
  },
  [SCENES.Search] : {
    type: 'push',
    route: {
      key: SCENES.Search.toString(),
      title: null
    }
  },
  [SCENES.ShowCuratedProduct] : {
    type: 'push',
    route: {
      key: SCENES.ShowCuratedProduct.toString(),
      title: null
    }
  },

  [SCENES.ProductAddToCart] : {
    type: 'push',
    route: {
      key: SCENES.ProductAddToCart.toString(),
      title: null
    }
  },
  [SCENES.Checkout] : {
    type: 'push',
    route: {
      key: SCENES.Checkout.toString(),
      title: null
    }
  },
  [SCENES.EnterNameAddress] : {
    type: 'push',
    route: {
      key: SCENES.EnterNameAddress.toString(),
      title: null
    }
  },
  [SCENES.EnterPaymentInfoPurchase] : {
    type: 'push',
    route: {
      key: SCENES.EnterPaymentInfoPurchase.toString(),
      title: null
    }
  },


}
