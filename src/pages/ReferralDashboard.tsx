import React from "react";

const mockReferralData = {
  username: "john_doe",
  referralCode: "ejQVi0jKio",
  totalReferrals: 125,
  totalWagered: "$158,018.00",
  totalEarnings: "$1,580.01",
  levels: [
    { level: "Bronze 1", xp: "1000 XP", completed: true },
    { level: "Bronze 2", xp: "1500 XP", completed: false },
    { level: "Bronze 3", xp: "2000 XP", completed: false },
    { level: "Bronze 4", xp: "2500 XP", completed: false },
  ],
};

const ReferralDashboard = () => {
  const {
    username,
    referralCode,
    totalReferrals,
    totalWagered,
    totalEarnings,
    levels,
  } = mockReferralData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Referral Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Invite friends using your referral link and earn commissions!
      </p>

      <div className="bg-black text-white p-4 rounded-md mb-6">
        <p className="text-sm">REFERRAL LINK</p>
        <div className="flex justify-between items-center bg-gray-800 p-2 rounded mt-1">
          <span className="text-xs">
            https://betkings.com?r={referralCode}
          </span>
          <button
            className="bg-yellow-500 text-black px-3 py-1 rounded text-xs"
            onClick={() => navigator.clipboard.writeText(`https://betkings.com?r=${referralCode}`)}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white mb-8">
        <div className="bg-yellow-500 p-4 rounded">
          <p className="text-lg font-bold">{totalReferrals}</p>
          <p>Total Referrals</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded">
          <p className="text-lg font-bold">{totalWagered}</p>
          <p>Total Wagered</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded">
          <p className="text-lg font-bold">{totalEarnings}</p>
          <p>Total Earnings</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Level Progress</h2>
      <div className="space-y-2 text-left">
        {levels.map((level, idx) => (
          <div
            key={idx}
            className={`p-3 rounded flex justify-between items-center ${
              level.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <span>{level.level} - {level.xp}</span>
            <span>
              {level.completed ? "✅ Completed" : "❌ Not Completed"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralDashboard;
