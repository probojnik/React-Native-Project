#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Shopify, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date callback: (RCTResponseSenderBlock)callback);

@end
