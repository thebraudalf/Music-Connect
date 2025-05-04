import { createRequire } from "node:module";

const newrequire = createRequire(import.meta.url);

const fluvioClient = newrequire("@fluvio/client");
const Fluvio = fluvioClient.default;
const Offset = fluvioClient.Offset;
const SmartModuleType = fluvioClient.SmartModuleType;

interface ProduceEventParams {
  event_type: string;
  user_id: string;
  song_id: string;
  timestamp: string;
}

interface ListeningHistoryEvent {
  event_type: string;
  user_id: string;
  song_id: string;
  timestamp: string;
}

const TOPIC_NAME = "test-module-again";
const PARTITION = 0;

// function to check topic is already exists
async function ensureTopicExists(fluvio: typeof Fluvio): Promise<void> {
  const admin = await fluvio.admin();
  try {
    await admin.createTopic(TOPIC_NAME);
    //console.log(`Topic "${TOPIC_NAME}" created.`);
  } catch (error: any) {
    if (error.message && !error.message.includes("TopicExists")) {
      console.error(`Error creating topic "${TOPIC_NAME}":`, error);
      throw error;
    } else {
      //console.log(`Topic "${TOPIC_NAME}" already exists.`);
    }
  }
}

// function to produce events
async function produceEvents(params: ProduceEventParams): Promise<void> {
  try {
    process.env.FLUVIO_CONFIG = "./fluvio-config";
    const fluvio = await Fluvio.connect();
    await ensureTopicExists(fluvio);

    const producer = await fluvio.topicProducer(TOPIC_NAME);

    const event: ListeningHistoryEvent = {
      event_type: params.event_type,
      user_id: params.user_id,
      song_id: params.song_id,
      timestamp: params.timestamp,
    };
    const eventData = JSON.stringify(event);

    await producer.sendRecord(eventData, PARTITION);
    //console.log(`Produced record: ${eventData} to topic "${TOPIC_NAME}" partition ${PARTITION}`);
  } catch (error) {
    //console.error("Error during produce operation:", error);
    throw error;
  }
}

// function to consume events
async function consumeEvents() {
  return new Promise(async (resolve, reject) => {
    try {
      process.env.FLUVIO_CONFIG = "./fluvio-config";
      const fluvio = await Fluvio.connect();
      const consumer = await fluvio.partitionConsumer(TOPIC_NAME, PARTITION);

      const smartModuleName =
        "music-connect-team/listening-history-module@0.1.0";
      //console.log(`Listening on "${TOPIC_NAME}" using SmartModule..."`);

      // using streamWithConfig() method to access smartmodule
      const stream = await consumer.streamWithConfig(Offset.FromEnd(), {
        smartmoduleName: smartModuleName,
        smartmoduleType: SmartModuleType.FilterMap,
      });

      for await (const record of stream) {
        const value = record.valueString();
        if (value) {
          try {
            const parsed = JSON.parse(value);
            //console.log("Filtered event from SmartModule:", parsed);
            resolve(parsed); // Return first match and exit
            break;
          } catch (err) {
            reject(new Error(`Failed to parse record: ${value}`));
          }
        }
      }
    } catch (err) {
      reject(err);
    }
  });
}

export { produceEvents, consumeEvents };
