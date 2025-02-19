#import "AppDelegate.h"
#import <Firebase.h>

#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"
#import <AuthenticationServices/AuthenticationServices.h> // <- Add This Import
#import <SafariServices/SafariServices.h> // <- Add This Import
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h> // <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import
@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"CrowdcareaidMobile";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  

  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions]; // added
  [FBSDKApplicationDelegate.sharedInstance initializeSDK];
    [[FBSDKApplicationDelegate sharedInstance] application:application
                          didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];  // here
  return didFinish; // added 
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"src/main"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [[FBSDKApplicationDelegate sharedInstance]application:app
                                                      openURL:url
                                                      options:options];
}

@end
