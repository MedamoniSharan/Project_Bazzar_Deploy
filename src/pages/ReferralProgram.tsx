import Lottie from "lottie-react";
import linkAnimation from "./refer1.json";
import inviteAnimation from "./refer2.json";
import rewardAnimation from "./refer3.json";

export default function ReferralProgram() {
  return (
    <div className="bg-background pt-4 pb-0 px-2 transition-colors">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Student Referral Program
        </h1>
        <p className="text-sm text-muted-foreground mb-3">
          Give a discount to your friends and get more. How it works:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40">
              <Lottie animationData={linkAnimation} loop />
            </div>
            <h2 className="text-base font-semibold text-foreground mt-2 mb-1">
              1. Get your Referral Code
            </h2>
            <p className="text-xs text-muted-foreground max-w-xs">
              Copy your Referralcode from website
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40">
              <Lottie animationData={inviteAnimation} loop />
            </div>
            <h2 className="text-base font-semibold text-foreground mt-2 mb-1">
              2. Invite friends
            </h2>
            <p className="text-xs text-muted-foreground max-w-xs">
              Invite your friends to buy project through the referral link or QR codes and get rewards once they complete a buying the project
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40">
              <Lottie animationData={rewardAnimation} loop />
            </div>
            <h2 className="text-base font-semibold text-foreground mt-2 mb-1">
              3. Get rewards
            </h2>
            <p className="text-xs text-muted-foreground max-w-xs">
              Receive up to <span className="font-bold text-primary">10%</span> commission in real time money 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
