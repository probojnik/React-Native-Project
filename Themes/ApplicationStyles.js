import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      // marginTop: Metrics.navBarHeight,
      backgroundColor: Colors.transparent,
    },
    mainContainerWithBackNavBar: {
      flex: 1,
      // marginTop: Metrics.backNavBarHeight,
      backgroundColor: Colors.transparent,
    },
    mainContainerMessenger: {
      flex: 1,
      // marginTop: Metrics.navBarMessengerHeight,
      backgroundColor: Colors.background,
    },
    mainContainerMessengerWithBackNavBar: {
      flex: 1,
      // marginTop: Metrics.backNavBarMessengerHeight,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
      paddingTop: 0,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      borderTopColor: Colors.frost,
      borderTopWidth: 0.5,
      borderBottomColor: Colors.frost,
      borderBottomWidth: 1,
    },
    row: {
      flexDirection: 'row',
    },
    alignCenter: {
      justifyContent: 'center',
    },
    sectionText: {
      color: Colors.coal,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      color: Colors.coal,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
  },
};

export default ApplicationStyles;
