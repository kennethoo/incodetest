import {
  MeettumMediaProducerClient,
  MeettumMediaConsumerClient,
} from "ApiServiveGateWay/meettumMediaTrackClient";

function useMeettumSdk() {
  return {
    producerService: new MeettumMediaProducerClient(),
    consumerService: new MeettumMediaConsumerClient(),
  };
}

export default useMeettumSdk;
