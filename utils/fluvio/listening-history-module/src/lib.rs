use wasm_bindgen::prelude::*;
use fluvio_smartmodule::dataplane::smartmodule::SmartModuleExtraParams;
use fluvio_smartmodule::{smartmodule, SmartModuleRecord, RecordData, Result};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Event {
    event_type: String,
    user_id: String,
    song_id: String,
    timestamp: String,
    #[serde(flatten)]
    extra: HashMap<String, Value>,
}

#[smartmodule(filter_map)]
pub fn filter_map(record: &SmartModuleRecord) -> Result<Option<(Option<RecordData>, RecordData)>> {
    let key = record.key.clone();
    let string = String::from_utf8_lossy(record.value.as_ref()).to_string();

    let mut event: Event = match serde_json::from_str(&string) {
        Ok(e) => e,
        Err(_) => return Ok(None), // skip invalid records
    };

    match event.event_type.as_str() {
        "play" | "like" => {
            if event.event_type == "play" {
                event.extra.insert("play_count".to_string(), json!(1));
            }

            let new_json = match serde_json::to_string(&event) {
                Ok(j) => j,
                Err(_) => return Ok(None),
            };

            Ok(Some((key, RecordData::from(new_json))))
        }
        _ => Ok(None), // filter out other event types
    }
}
