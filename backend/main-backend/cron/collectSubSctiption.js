import moment from "moment";
import { meetumCodeSubscriptionApi } from "../application/meettumSubscription.js";

import { userManager } from "../application/user.js";

async function collectSubscription() {
  const today = moment.utc().format("YYYY-MM-DD");

  //Collect a all user
  const { users } = await userManager.internalGetUsers({ isProUser: true });

  for (const user of users) {
    //get user subsctition
    const { userId } = user;

    const { succeeded, subscriptions } =
      await meetumCodeSubscriptionApi.getAllUserSuScription(userId);

    if (!succeeded) {
      return;
    }

    const todayMoment = moment(today);

    for (const subscription of subscriptions) {
      const nextPayDayMoment = moment(subscription.nextPaymentDate);
      const isPast = nextPayDayMoment.isBefore(todayMoment);

      if (subscription.nextPaymentDate === today || isPast) {
        if (subscription.status === true) {
          const transactionResult =
            await meetumCodeSubscriptionApi.chargeUserForMeettumSubScription(
              subscription,
            );

          if (!transactionResult.succeeded) {
            //email ther user lol

            await meetumCodeSubscriptionApi.removeUserSubScrioption(
              subscription._doc,
            );
          }
        } else {
          await meetumCodeSubscriptionApi.removeUserSubScrioption(
            subscription._doc,
          );
        }
      }
    }

    const { subscriptions: allSubSctiotionLeft } =
      await meetumCodeSubscriptionApi.getAllUserSuScription(userId);

    if (allSubSctiotionLeft.length == 0) {
      userManager.removeUserProMetttumPro(userId);
    }
  }
}

export default collectSubscription;
