"use client";

import { useEffect, useState } from "react";
import { DollarSign, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stripeCurrencyFormatter } from "@/lib/utils";
import axiosInstance from "@/lib/axios-instance";

interface Balance {
  pending: { amount: number; currency: string }[];
}

const InstructorRevenuePageClientComponent = () => {
  const [balance, setBalance] = useState<Balance>({ pending: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const { data } = await axiosInstance.get("/instructor/balance");
      setBalance(data?.data);
    } finally {
    }
  };

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/instructor/payout-settings");
      window.location.href = data?.data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Revenue Report</CardTitle>
          <DollarSign className="text-green-600" />
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            You get paid directly from Stripe to your bank account every 48
            hours.
          </p>

          <div>
            <h4 className="text-lg font-medium mb-2">Pending Balance</h4>
            <div className="flex flex-col gap-2">
              {balance.pending.length > 0 ? (
                balance.pending.map((bp, i) => (
                  <span key={i} className="text-right text-base">
                    {stripeCurrencyFormatter(bp)}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground">No pending balance</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              For the last 48 hours
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">Payout Settings</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePayoutSettings}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Settings className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Update your Stripe account details or view previous payouts
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorRevenuePageClientComponent;
