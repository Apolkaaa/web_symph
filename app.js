const app_state = {
  audio_context: null,
  is_playing: false,
  current_step: 0,
  next_note_time: 0,
  timer_id: null,
  bird_timer_id: null,
  melody_name: "morning_glass",
  nature: {
    rain: false,
    sea: false,
    leaves: false,
    birds: false
  },
  decks: {
    hang: true,
    techno: true
  },
  visuals: {
    last_time: null,
    hang: { angle: 0, image_index: 0 },
    techno: { angle: 0, image_index: 0 }
  },
  sequences: {
    hang: Array(32).fill(true),
    wood: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]
  },
  nodes: {},
  noise_nodes: {}
};

const melody_sets = {
  morning_glass: {
    root: 62,
    scale: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19],
    pad: [0, 7, 10, 15],
    hang: [
      [{ degree: 0, length: 5.5, velocity: 0.78 }],
      [{ degree: 7, length: 2.6, velocity: 0.3 }, { degree: 10, length: 2, velocity: 0.22, delay: 0.5 }],
      [{ degree: 12, length: 3.8, velocity: 0.52 }],
      [{ degree: 15, length: 1.9, velocity: 0.28 }, { degree: 14, length: 1.7, velocity: 0.22, delay: 0.5 }],
      [{ degree: 12, length: 5, velocity: 0.7 }],
      [{ degree: 10, length: 2.4, velocity: 0.34 }, { degree: 7, length: 2, velocity: 0.24, delay: 0.5 }],
      [{ degree: 5, length: 3.8, velocity: 0.5 }],
      [{ degree: 7, length: 2.2, velocity: 0.32 }, { degree: 10, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 3, length: 5.4, velocity: 0.72 }],
      [{ degree: 7, length: 2.4, velocity: 0.33 }, { degree: 10, length: 1.8, velocity: 0.24, delay: 0.5 }],
      [{ degree: 12, length: 4, velocity: 0.54 }],
      [{ degree: 14, length: 2, velocity: 0.3 }, { degree: 12, length: 1.8, velocity: 0.23, delay: 0.5 }],
      [{ degree: 10, length: 5.2, velocity: 0.68 }],
      [{ degree: 8, length: 2.5, velocity: 0.32 }, { degree: 7, length: 1.8, velocity: 0.24, delay: 0.5 }],
      [{ degree: 5, length: 3.8, velocity: 0.48 }],
      [{ degree: 7, length: 2.2, velocity: 0.28 }, { degree: 0, length: 2.6, velocity: 0.24, delay: 0.5 }]
    ],
    hang_second: [
      [{ degree: -2, length: 5.8, velocity: 0.72 }],
      [{ degree: 3, length: 2.4, velocity: 0.3 }, { degree: 7, length: 2, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 4.2, velocity: 0.5 }],
      [{ degree: 12, length: 2.1, velocity: 0.28 }, { degree: 15, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 17, length: 5, velocity: 0.66 }],
      [{ degree: 15, length: 2.4, velocity: 0.32 }, { degree: 12, length: 1.9, velocity: 0.23, delay: 0.5 }],
      [{ degree: 10, length: 4.2, velocity: 0.5 }],
      [{ degree: 8, length: 2.1, velocity: 0.28 }, { degree: 7, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 5, length: 5.4, velocity: 0.68 }],
      [{ degree: 7, length: 2.4, velocity: 0.32 }, { degree: 10, length: 1.8, velocity: 0.23, delay: 0.5 }],
      [{ degree: 12, length: 4, velocity: 0.5 }],
      [{ degree: 10, length: 2.1, velocity: 0.3 }, { degree: 7, length: 1.9, velocity: 0.23, delay: 0.5 }],
      [{ degree: 3, length: 5.2, velocity: 0.66 }],
      [{ degree: 5, length: 2.4, velocity: 0.31 }, { degree: 7, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 4, velocity: 0.48 }],
      [{ degree: 7, length: 2.2, velocity: 0.28 }, { degree: 0, length: 3, velocity: 0.25, delay: 0.5 }]
    ],
    wood: [null, null, null, null, 0, null, null, null, null, null, null, null, 2, null, null, null]
  },
  soft_rain: {
    root: 57,
    scale: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19],
    pad: [0, 7, 10, 15],
    hang: [
      [{ degree: 0, length: 5.8, velocity: 0.74 }],
      [{ degree: 5, length: 2.4, velocity: 0.3 }, { degree: 7, length: 2, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 4.2, velocity: 0.5 }],
      [{ degree: 12, length: 2.1, velocity: 0.3 }, { degree: 15, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 14, length: 5.2, velocity: 0.64 }],
      [{ degree: 12, length: 2.6, velocity: 0.32 }, { degree: 10, length: 2, velocity: 0.24, delay: 0.5 }],
      [{ degree: 8, length: 4.2, velocity: 0.48 }],
      [{ degree: 7, length: 2.2, velocity: 0.3 }, { degree: 5, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 3, length: 5.4, velocity: 0.68 }],
      [{ degree: 7, length: 2.4, velocity: 0.32 }, { degree: 10, length: 1.8, velocity: 0.23, delay: 0.5 }],
      [{ degree: 12, length: 4.2, velocity: 0.5 }],
      [{ degree: 15, length: 2.1, velocity: 0.28 }, { degree: 14, length: 1.9, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 5.4, velocity: 0.66 }],
      [{ degree: 8, length: 2.4, velocity: 0.31 }, { degree: 7, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 5, length: 4, velocity: 0.46 }],
      [{ degree: 3, length: 2.2, velocity: 0.28 }, { degree: 0, length: 2.8, velocity: 0.24, delay: 0.5 }]
    ],
    hang_second: [
      [{ degree: -2, length: 5.6, velocity: 0.7 }],
      [{ degree: 3, length: 2.4, velocity: 0.3 }, { degree: 5, length: 2, velocity: 0.22, delay: 0.5 }],
      [{ degree: 8, length: 4.2, velocity: 0.48 }],
      [{ degree: 10, length: 2.1, velocity: 0.28 }, { degree: 12, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 15, length: 5.2, velocity: 0.64 }],
      [{ degree: 14, length: 2.4, velocity: 0.32 }, { degree: 10, length: 1.9, velocity: 0.23, delay: 0.5 }],
      [{ degree: 7, length: 4.2, velocity: 0.48 }],
      [{ degree: 5, length: 2.1, velocity: 0.28 }, { degree: 3, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 0, length: 5.4, velocity: 0.68 }],
      [{ degree: 3, length: 2.4, velocity: 0.32 }, { degree: 7, length: 1.8, velocity: 0.23, delay: 0.5 }],
      [{ degree: 10, length: 4.2, velocity: 0.5 }],
      [{ degree: 12, length: 2.1, velocity: 0.29 }, { degree: 10, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 7, length: 5.4, velocity: 0.64 }],
      [{ degree: 5, length: 2.4, velocity: 0.3 }, { degree: 3, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 2, length: 4, velocity: 0.46 }],
      [{ degree: 3, length: 2.2, velocity: 0.28 }, { degree: 0, length: 3, velocity: 0.24, delay: 0.5 }]
    ],
    wood: [null, null, null, null, null, null, 0, null, null, null, null, null, 3, null, null, null]
  },
  leaf_breath: {
    root: 65,
    scale: [0, 2, 3, 5, 7, 9, 10, 12, 14, 15, 17, 19],
    pad: [0, 7, 10, 14],
    hang: [
      [{ degree: 0, length: 5.4, velocity: 0.76 }],
      [{ degree: 7, length: 2.5, velocity: 0.32 }, { degree: 10, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 14, length: 4, velocity: 0.52 }],
      [{ degree: 12, length: 2.2, velocity: 0.3 }, { degree: 10, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 7, length: 5.2, velocity: 0.68 }],
      [{ degree: 9, length: 2.5, velocity: 0.32 }, { degree: 12, length: 1.9, velocity: 0.23, delay: 0.5 }],
      [{ degree: 15, length: 3.8, velocity: 0.5 }],
      [{ degree: 17, length: 2.1, velocity: 0.28 }, { degree: 15, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 5.4, velocity: 0.68 }],
      [{ degree: 7, length: 2.4, velocity: 0.32 }, { degree: 5, length: 1.8, velocity: 0.23, delay: 0.5 }],
      [{ degree: 3, length: 4, velocity: 0.5 }],
      [{ degree: 5, length: 2.1, velocity: 0.28 }, { degree: 7, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 2, length: 5.2, velocity: 0.64 }],
      [{ degree: 5, length: 2.4, velocity: 0.31 }, { degree: 7, length: 1.9, velocity: 0.23, delay: 0.5 }],
      [{ degree: 10, length: 4, velocity: 0.48 }],
      [{ degree: 7, length: 2.2, velocity: 0.28 }, { degree: 0, length: 2.6, velocity: 0.24, delay: 0.5 }]
    ],
    hang_second: [
      [{ degree: -2, length: 5.6, velocity: 0.7 }],
      [{ degree: 3, length: 2.4, velocity: 0.3 }, { degree: 7, length: 1.9, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 4.2, velocity: 0.5 }],
      [{ degree: 14, length: 2.1, velocity: 0.28 }, { degree: 15, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 19, length: 5, velocity: 0.62 }],
      [{ degree: 17, length: 2.4, velocity: 0.32 }, { degree: 15, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 14, length: 4, velocity: 0.48 }],
      [{ degree: 12, length: 2.1, velocity: 0.28 }, { degree: 10, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 7, length: 5.4, velocity: 0.66 }],
      [{ degree: 5, length: 2.4, velocity: 0.3 }, { degree: 3, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 2, length: 4.2, velocity: 0.48 }],
      [{ degree: 5, length: 2.1, velocity: 0.28 }, { degree: 7, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 10, length: 5.2, velocity: 0.64 }],
      [{ degree: 7, length: 2.4, velocity: 0.3 }, { degree: 5, length: 1.8, velocity: 0.22, delay: 0.5 }],
      [{ degree: 3, length: 4, velocity: 0.46 }],
      [{ degree: 2, length: 2.2, velocity: 0.28 }, { degree: 0, length: 3, velocity: 0.24, delay: 0.5 }]
    ],
    wood: [null, null, null, true, null, null, null, null, null, null, null, true, null, null, null, null]
  }
};

const sequence_meta = [
  { name: "hang", label: "hang_melody_32" },
  { name: "wood", label: "wood_accents" }
];

const disc_images = {
  hang: ["assets/r_1.png", "assets/r_2.png", "assets/r_3.png"],
  techno: ["assets/i_1.png", "assets/i_2.png", "assets/i_3.png"]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function midi_to_frequency(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function get_number(id) {
  return Number($(id).value);
}

function normalized(id) {
  return get_number(id) / 100;
}

function create_audio_graph() {
  const audio_context = new AudioContext();
  const master_gain = audio_context.createGain();
  const reverb_gain = audio_context.createGain();
  const delay_gain = audio_context.createGain();
  const compressor = audio_context.createDynamicsCompressor();
  const reverb = audio_context.createConvolver();
  const delay = audio_context.createDelay(2);
  const delay_feedback = audio_context.createGain();

  master_gain.gain.value = 0.74;
  reverb_gain.gain.value = 0.42;
  delay_gain.gain.value = 0.18;
  delay.delayTime.value = 0.48;
  delay_feedback.gain.value = 0.38;
  compressor.threshold.value = -18;
  compressor.knee.value = 26;
  compressor.ratio.value = 5;
  compressor.attack.value = 0.02;
  compressor.release.value = 0.32;
  reverb.buffer = create_reverb_buffer(audio_context, 5.8);

  master_gain.connect(compressor);
  compressor.connect(audio_context.destination);
  reverb_gain.connect(reverb);
  reverb.connect(master_gain);
  delay_gain.connect(delay);
  delay.connect(delay_feedback);
  delay_feedback.connect(delay);
  delay.connect(master_gain);

  app_state.audio_context = audio_context;
  app_state.nodes = {
    master_gain,
    reverb_gain,
    delay_gain,
    compressor
  };

  create_nature_layers();
}

function create_reverb_buffer(audio_context, length_seconds) {
  const length = audio_context.sampleRate * length_seconds;
  const buffer = audio_context.createBuffer(2, length, audio_context.sampleRate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);

    for (let i = 0; i < length; i += 1) {
      const fade = Math.pow(1 - i / length, 2.8);
      data[i] = (Math.random() * 2 - 1) * fade;
    }
  }

  return buffer;
}

function create_noise_buffer(audio_context, seconds) {
  const length = Math.floor(audio_context.sampleRate * seconds);
  const buffer = audio_context.createBuffer(1, length, audio_context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function ensure_audio() {
  if (!app_state.audio_context) {
    create_audio_graph();
  }

  if (app_state.audio_context.state === "suspended") {
    app_state.audio_context.resume();
  }
}

function make_voice_output(level_id, send_reverb = 0.5, send_delay = 0.1, life_ms = 10000) {
  const audio_context = app_state.audio_context;
  const gain = audio_context.createGain();
  const level = normalized(level_id);

  gain.gain.value = level;
  gain.connect(app_state.nodes.master_gain);

  const reverb_send = audio_context.createGain();
  reverb_send.gain.value = send_reverb;
  gain.connect(reverb_send);
  reverb_send.connect(app_state.nodes.reverb_gain);

  const delay_send = audio_context.createGain();
  delay_send.gain.value = send_delay;
  gain.connect(delay_send);
  delay_send.connect(app_state.nodes.delay_gain);

  window.setTimeout(() => {
    gain.disconnect();
    reverb_send.disconnect();
    delay_send.disconnect();
  }, life_ms);

  return gain;
}

function play_koshi(note, time, step_index, size = 1, tail = 8.2) {
  const audio_context = app_state.audio_context;
  const shimmer = normalized("#shimmer_slider");
  const frequency = midi_to_frequency(note);
  const output = make_voice_output("#koshi_level", 0.74 + shimmer * 0.1, 0.22 + shimmer * 0.12, 6000);
  const pan = audio_context.createStereoPanner();
  const body = audio_context.createGain();
  const random_shift = (Math.random() - 0.5) * 0.035;
  const ratios = [1, 2.01, 2.72, 3.98, 5.43];

  pan.pan.value = Math.sin(step_index * 1.2 + size) * 0.42 + (Math.random() - 0.5) * 0.12;
  body.gain.setValueAtTime(0.0001, time);
  body.gain.linearRampToValueAtTime((0.14 + shimmer * 0.08) * size, time + 0.035);
  body.gain.exponentialRampToValueAtTime(0.0001, time + tail - 0.08);
  body.connect(pan);
  pan.connect(output);

  ratios.forEach((ratio, index) => {
    const osc = audio_context.createOscillator();
    const partial_gain = audio_context.createGain();
    osc.type = index === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(frequency * ratio * (1 + random_shift * (index + 1) * 0.12), time);
    partial_gain.gain.value = [0.74, 0.36, 0.2, 0.1, 0.05][index];
    osc.connect(partial_gain);
    partial_gain.connect(body);
    osc.start(time + index * 0.004 + Math.random() * 0.012);
    osc.stop(time + tail);
  });
}

function play_koshi_note(degree, index) {
  ensure_audio();

  const audio_context = app_state.audio_context;
  const melody = melody_sets[app_state.melody_name];
  const note = melody.root + degree;
  const now = audio_context.currentTime + 0.01;
  play_koshi(note, now, index, 0.78, 1.55);
}

function play_hang(event, time, step_index) {
  const audio_context = app_state.audio_context;
  const breath = normalized("#breath_slider");
  const note = note_from_degree(event.degree);
  const frequency = midi_to_frequency(note);
  const output = make_voice_output("#hang_level", 0.5, 0.14);
  const lowpass = audio_context.createBiquadFilter();
  const body = audio_context.createGain();
  const pan = audio_context.createStereoPanner();
  const noise_source = audio_context.createBufferSource();
  const noise_filter = audio_context.createBiquadFilter();
  const noise_gain = audio_context.createGain();
  const ratios = [1, 2.01, 2.98, 4.12, 5.42];
  const length = get_step_seconds() * event.length;
  const velocity = event.velocity || 0.5;

  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(680 + breath * 500, time);
  lowpass.frequency.linearRampToValueAtTime(1180 + breath * 1180, time + length * 0.45);
  lowpass.frequency.exponentialRampToValueAtTime(520 + breath * 580, time + length + 0.8);
  lowpass.Q.value = 1.4;
  pan.pan.value = Math.sin(step_index * 0.7) * 0.18;
  body.gain.setValueAtTime(0.0001, time);
  body.gain.exponentialRampToValueAtTime((0.28 + breath * 0.1) * velocity, time + 0.028);
  body.gain.exponentialRampToValueAtTime(0.0001, time + length + 1.2 + breath * 1.8);
  body.connect(lowpass);
  lowpass.connect(pan);
  pan.connect(output);

  ratios.forEach((ratio, index) => {
    const osc = audio_context.createOscillator();
    const partial_gain = audio_context.createGain();
    const detune = (Math.random() - 0.5) * 5;
    osc.type = index < 2 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(frequency * ratio, time);
    osc.detune.setValueAtTime(detune, time);
    partial_gain.gain.value = [1, 0.48, 0.22, 0.11, 0.06][index];
    osc.connect(partial_gain);
    partial_gain.connect(body);
    osc.start(time);
    osc.stop(time + length + 3.2);
  });

  noise_source.buffer = create_noise_buffer(audio_context, 0.08);
  noise_filter.type = "bandpass";
  noise_filter.frequency.value = 980;
  noise_filter.Q.value = 3.5;
  noise_gain.gain.setValueAtTime(0.0001, time);
  noise_gain.gain.exponentialRampToValueAtTime(0.05 * velocity, time + 0.005);
  noise_gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.11);
  noise_source.connect(noise_filter);
  noise_filter.connect(noise_gain);
  noise_gain.connect(output);
  noise_source.start(time);
}

function play_wood(time) {
  const audio_context = app_state.audio_context;
  const output = make_voice_output("#wood_level", 0.32, 0.05);
  const buffer = create_noise_buffer(audio_context, 0.16);
  const source = audio_context.createBufferSource();
  const filter = audio_context.createBiquadFilter();
  const knock = audio_context.createOscillator();
  const gain = audio_context.createGain();
  const knock_gain = audio_context.createGain();

  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(820 + Math.random() * 360, time);
  filter.Q.value = 9;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.44, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.13);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(output);

  knock.type = "sine";
  knock.frequency.setValueAtTime(360 + Math.random() * 180, time);
  knock_gain.gain.setValueAtTime(0.18, time);
  knock_gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
  knock.connect(knock_gain);
  knock_gain.connect(output);

  source.start(time);
  knock.start(time);
  knock.stop(time + 0.12);
}

function play_pad_bloom(time, step_index) {
  const audio_context = app_state.audio_context;
  const melody = melody_sets[app_state.melody_name];
  const breath = normalized("#breath_slider");
  const filter = audio_context.createBiquadFilter();
  const gain = audio_context.createGain();
  const pan = audio_context.createStereoPanner();
  const duration = get_step_seconds() * 16;
  const output = make_voice_output("#pad_level", 0.84, 0.08, duration * 1000 + 4000);
  const notes = melody.pad.map((degree) => melody.root + degree - 12);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(220 + breath * 180, time);
  filter.frequency.linearRampToValueAtTime(980 + breath * 620, time + duration * 0.44);
  filter.frequency.exponentialRampToValueAtTime(260 + breath * 220, time + duration * 0.96);
  filter.Q.value = 0.9;
  pan.pan.value = step_index === 0 ? -0.18 : 0.18;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.2 + breath * 0.2, time + duration * 0.34);
  gain.gain.linearRampToValueAtTime(0.13 + breath * 0.1, time + duration * 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  gain.connect(filter);
  filter.connect(pan);
  pan.connect(output);

  notes.forEach((note, index) => {
    const osc = audio_context.createOscillator();
    const soft_gain = audio_context.createGain();
    osc.type = index % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(midi_to_frequency(note), time);
    osc.detune.setValueAtTime((index - 1.5) * 3, time);
    soft_gain.gain.value = [0.58, 0.34, 0.22, 0.16][index] || 0.12;
    osc.connect(soft_gain);
    soft_gain.connect(gain);
    osc.start(time);
    osc.stop(time + duration + 0.4);
  });
}

function play_pulse(time) {
  const audio_context = app_state.audio_context;
  const output = make_voice_output("#pulse_level", 0.06, 0.01, 1800);
  const osc = audio_context.createOscillator();
  const click = audio_context.createBufferSource();
  const click_filter = audio_context.createBiquadFilter();
  const gain = audio_context.createGain();
  const click_gain = audio_context.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(156, time);
  osc.frequency.exponentialRampToValueAtTime(38, time + 0.22);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(1.15, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.36);
  osc.connect(gain);
  gain.connect(output);

  click.buffer = create_noise_buffer(audio_context, 0.04);
  click_filter.type = "lowpass";
  click_filter.frequency.value = 1600;
  click_filter.Q.value = 0.7;
  click_gain.gain.setValueAtTime(0.0001, time);
  click_gain.gain.exponentialRampToValueAtTime(0.24, time + 0.003);
  click_gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);
  click.connect(click_filter);
  click_filter.connect(click_gain);
  click_gain.connect(output);

  osc.start(time);
  click.start(time);
  osc.stop(time + 0.42);
}

function play_sub(step_index, time) {
  const audio_context = app_state.audio_context;
  const melody = melody_sets[app_state.melody_name];
  const degrees = [0, 0, 3, 5, 7, 7, 10, 5];
  const degree = degrees[Math.floor(step_index / 4) % degrees.length];
  const frequency = midi_to_frequency(melody.root + degree - 24);
  const output = make_voice_output("#sub_level", 0.18, 0.04, 5000);
  const filter = audio_context.createBiquadFilter();
  const gain = audio_context.createGain();
  const osc = audio_context.createOscillator();
  const soft = audio_context.createOscillator();
  const length = get_step_seconds() * 2.6;

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(220, time);
  filter.frequency.linearRampToValueAtTime(420, time + length * 0.35);
  filter.frequency.exponentialRampToValueAtTime(160, time + length);
  filter.Q.value = 1.2;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.24, time + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + length);
  osc.type = "sine";
  soft.type = "triangle";
  osc.frequency.setValueAtTime(frequency, time);
  soft.frequency.setValueAtTime(frequency * 2, time);
  osc.connect(gain);
  soft.connect(gain);
  gain.connect(filter);
  filter.connect(output);
  osc.start(time);
  soft.start(time);
  osc.stop(time + length + 0.1);
  soft.stop(time + length + 0.1);
}

function play_cymbal(step_index, time, is_open = false) {
  const audio_context = app_state.audio_context;
  const output = make_voice_output("#tick_level", is_open ? 0.34 : 0.24, is_open ? 0.22 : 0.08, is_open ? 3600 : 2200);
  const source = audio_context.createBufferSource();
  const highpass = audio_context.createBiquadFilter();
  const bandpass = audio_context.createBiquadFilter();
  const gain = audio_context.createGain();
  const pan = audio_context.createStereoPanner();
  const length = is_open ? 0.7 : 0.12;

  source.buffer = create_noise_buffer(audio_context, is_open ? 0.9 : 0.16);
  source.playbackRate.setValueAtTime(is_open ? 1.1 : 1.7, time);
  highpass.type = "highpass";
  highpass.frequency.value = is_open ? 4200 : 5600;
  bandpass.type = "bandpass";
  bandpass.frequency.value = is_open ? 8200 : 9200;
  bandpass.Q.value = is_open ? 0.8 : 1.8;
  pan.pan.value = Math.sin(step_index * 0.8) * 0.32;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(is_open ? 0.26 : 0.18, time + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + length);
  source.connect(highpass);
  highpass.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(pan);
  pan.connect(output);
  source.start(time);
}

function schedule_techno_layers(step_index, time) {
  const step_seconds = get_step_seconds();

  if (step_index % 2 === 0) {
    play_pulse(time);
  }

  if (step_index % 4 === 0) {
    play_sub(step_index, time + step_seconds * 0.04);
  }

  if (step_index % 2 === 1) {
    play_cymbal(step_index, time + step_seconds * 0.08, false);
  }

  if ([7, 15, 23, 31].includes(step_index)) {
    play_cymbal(step_index, time + step_seconds * 0.18, true);
  }
}

function create_nature_layers() {
  const audio_context = app_state.audio_context;
  app_state.noise_nodes.rain = create_loop_noise("highpass", 2200);
  app_state.noise_nodes.sea = create_loop_noise("lowpass", 780, true);
  app_state.noise_nodes.leaves = create_loop_noise("bandpass", 1800);
  app_state.noise_nodes.birds = create_bird_layer();

  ["rain", "sea", "leaves"].forEach((name) => app_state.noise_nodes[name].source.start(audio_context.currentTime));
}

function create_loop_noise(filter_type, frequency, has_swell = false) {
  const audio_context = app_state.audio_context;
  const source = audio_context.createBufferSource();
  const filter = audio_context.createBiquadFilter();
  const gain = audio_context.createGain();
  const swell = audio_context.createGain();

  source.buffer = create_noise_buffer(audio_context, 4);
  source.loop = true;
  filter.type = filter_type;
  filter.frequency.value = frequency;
  filter.Q.value = 0.8;
  gain.gain.value = 0;
  source.connect(filter);

  if (has_swell) {
    const lfo = audio_context.createOscillator();
    const lfo_depth = audio_context.createGain();
    swell.gain.value = 0.58;
    lfo.type = "sine";
    lfo.frequency.value = 0.065;
    lfo_depth.gain.value = 0.34;
    lfo.connect(lfo_depth);
    lfo_depth.connect(swell.gain);
    lfo.start(audio_context.currentTime);
    filter.connect(swell);
    swell.connect(gain);
  } else {
    filter.connect(gain);
  }

  gain.connect(app_state.nodes.master_gain);
  gain.connect(app_state.nodes.reverb_gain);

  return { source, filter, gain };
}

function create_bird_layer() {
  const audio_context = app_state.audio_context;
  const gain = audio_context.createGain();

  gain.gain.value = 0;
  gain.connect(app_state.nodes.master_gain);
  gain.connect(app_state.nodes.reverb_gain);

  return { gain };
}

function update_nature_layer(name) {
  if (!app_state.audio_context) {
    return;
  }

  const audio_context = app_state.audio_context;
  const target = app_state.nature[name] ? 1 : 0;
  const layer = app_state.noise_nodes[name];
  const values = {
    rain: 0.074,
    sea: 0.11,
    leaves: 0.066,
    birds: 0.16
  };
  const level = normalized(`#${name}_level`);

  layer.gain.gain.cancelScheduledValues(audio_context.currentTime);
  layer.gain.gain.setTargetAtTime(target * values[name] * level, audio_context.currentTime, 0.8);
}

function play_bird_chirp(time) {
  const audio_context = app_state.audio_context;
  const layer = app_state.noise_nodes.birds;
  const notes = [2600, 3100, 3700, 4200];
  const chirp_count = 2 + Math.floor(Math.random() * 3);

  for (let index = 0; index < chirp_count; index += 1) {
    const osc = audio_context.createOscillator();
    const gain = audio_context.createGain();
    const filter = audio_context.createBiquadFilter();
    const start = time + index * (0.055 + Math.random() * 0.035);
    const length = 0.055 + Math.random() * 0.05;
    const frequency = notes[Math.floor(Math.random() * notes.length)] * (0.94 + Math.random() * 0.14);

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, start);
    osc.frequency.exponentialRampToValueAtTime(frequency * (1.08 + Math.random() * 0.18), start + length);
    filter.type = "bandpass";
    filter.frequency.value = frequency;
    filter.Q.value = 7;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.26, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(layer.gain);
    osc.start(start);
    osc.stop(start + length + 0.02);
  }
}

function schedule_bird_chirps() {
  window.clearTimeout(app_state.bird_timer_id);
  app_state.bird_timer_id = null;

  if (!app_state.nature.birds || !app_state.audio_context) {
    return;
  }

  app_state.bird_timer_id = window.setTimeout(() => {
    if (app_state.nature.birds && app_state.audio_context) {
      play_bird_chirp(app_state.audio_context.currentTime + 0.02);
      schedule_bird_chirps();
    }
  }, 650 + Math.random() * 1850);
}

function play_rain_drop(time) {
  const audio_context = app_state.audio_context;
  const output = app_state.nodes.master_gain;
  const osc = audio_context.createOscillator();
  const gain = audio_context.createGain();
  const filter = audio_context.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1500 + Math.random() * 1200, time);
  filter.type = "bandpass";
  filter.frequency.value = 2400;
  filter.Q.value = 4;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.05 * normalized("#rain_level"), time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(output);
  gain.connect(app_state.nodes.reverb_gain);
  osc.start(time);
  osc.stop(time + 0.24);
}

function get_step_seconds() {
  return 60 / get_number("#tempo_slider") * 0.5;
}

function note_from_degree(degree) {
  const melody = melody_sets[app_state.melody_name];
  return melody.root + degree;
}

function schedule_step(step_index, time) {
  const melody = melody_sets[app_state.melody_name];
  const pattern_step = step_index % 16;
  const hang_step = step_index % 32;
  const hang_phrase = hang_step < 16 ? melody.hang : melody.hang_second;
  const hang_pattern_step = hang_step % 16;

  if (app_state.decks.hang && (hang_step === 0 || hang_step === 16)) {
    play_pad_bloom(time, hang_step);
  }

  if (app_state.decks.hang && app_state.sequences.hang[hang_step] && hang_phrase[hang_pattern_step]) {
    hang_phrase[hang_pattern_step].forEach((event) => {
      const delay = event.delay ? event.delay * get_step_seconds() : 0;
      play_hang(event, time + delay, hang_step);
    });
  }

  if (app_state.decks.techno) {
    schedule_techno_layers(hang_step, time);
  }

  if (app_state.decks.hang && app_state.sequences.wood[pattern_step] && melody.wood[pattern_step] !== null) {
    play_wood(time + Math.random() * 0.035);
  }

  if (app_state.nature.rain && Math.random() > 0.38) {
    play_rain_drop(time + Math.random() * get_step_seconds());
  }

  draw_current_step(hang_step);
}

function scheduler_tick() {
  const audio_context = app_state.audio_context;

  while (app_state.next_note_time < audio_context.currentTime + 0.18) {
    schedule_step(app_state.current_step, app_state.next_note_time);
    app_state.next_note_time += get_step_seconds();
    app_state.current_step = (app_state.current_step + 1) % 32;
  }
}

function start_playback() {
  ensure_audio();

  if (app_state.is_playing) {
    return;
  }

  app_state.is_playing = true;
  app_state.current_step = 0;
  app_state.next_note_time = app_state.audio_context.currentTime + 0.08;
  app_state.timer_id = window.setInterval(scheduler_tick, 28);
  $("#start_button").classList.add("is_active");
}

function stop_playback() {
  app_state.is_playing = false;
  window.clearInterval(app_state.timer_id);
  app_state.timer_id = null;
  app_state.current_step = 0;
  draw_current_step(-1);
  $("#start_button").classList.remove("is_active");
}

function draw_sequences() {
  const panel = $("#sequence_panel");
  panel.innerHTML = "";

  sequence_meta.forEach((item) => {
    const row = document.createElement("article");
    const header = document.createElement("div");
    const title = document.createElement("h2");
    const mute_button = document.createElement("button");
    const grid = document.createElement("div");

    row.className = "sequence_row";
    row.dataset.sequence = item.name;
    header.className = "sequence_header";
    title.textContent = item.label;
    mute_button.type = "button";
    mute_button.textContent = "clear";
    mute_button.addEventListener("click", () => {
      const has_enabled = app_state.sequences[item.name].some(Boolean);
      app_state.sequences[item.name] = Array(app_state.sequences[item.name].length).fill(!has_enabled);
      draw_sequences();
    });
    grid.className = "step_grid";
    grid.classList.toggle("is_long_grid", app_state.sequences[item.name].length === 32);

    app_state.sequences[item.name].forEach((is_enabled, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `step_button${is_enabled ? " is_enabled" : ""}`;
      button.dataset.sequence = item.name;
      button.dataset.index = String(index);
      button.setAttribute("data_step", String(index + 1));
      button.setAttribute("aria-label", `${item.name} step ${index + 1}`);
      button.addEventListener("click", () => {
        app_state.sequences[item.name][index] = !app_state.sequences[item.name][index];
        button.classList.toggle("is_enabled", app_state.sequences[item.name][index]);
      });
      grid.append(button);
    });

    header.append(title, mute_button);
    row.append(header, grid);
    panel.append(row);
  });
}

function draw_current_step(step_index) {
  $$(".step_button").forEach((button) => {
    const sequence = button.dataset.sequence;
    const current_index = sequence === "hang" ? step_index : step_index % 16;
    button.classList.toggle("is_current", Number(button.dataset.index) === current_index);
  });
}

function get_disc_speed(name) {
  const tempo = get_number("#tempo_slider");
  const hang_duration = Math.max(5.4, 15.8 - tempo * 0.105);
  const duration = name === "techno" ? Math.max(4.6, hang_duration * 0.82) : hang_duration;

  return 360 / duration;
}

function draw_disc(name) {
  const state = app_state.visuals[name];
  const disc = $(`#${name}_disc`);
  const images = Array.from(disc.querySelectorAll(".disc_image"));
  const image_index = Math.floor(state.angle / 60) % disc_images[name].length;

  if (state.image_index !== image_index) {
    state.image_index = image_index;
    images.forEach((image, index) => {
      image.classList.toggle("is_active", index === image_index);
    });
  }

  disc.style.transform = `rotate(${state.angle.toFixed(2)}deg)`;
}

function update_disc_visuals(time = 0) {
  if (app_state.visuals.last_time === null) {
    app_state.visuals.last_time = time;
  }

  const seconds = Math.min(0.08, (time - app_state.visuals.last_time) / 1000);
  app_state.visuals.last_time = time;

  ["hang", "techno"].forEach((name) => {
    const state = app_state.visuals[name];

    if (app_state.is_playing && app_state.decks[name]) {
      state.angle = (state.angle + get_disc_speed(name) * seconds) % 360;
    }

    draw_disc(name);
  });

  window.requestAnimationFrame(update_disc_visuals);
}

function bind_controls() {
  $("#start_button").addEventListener("click", start_playback);
  $("#stop_button").addEventListener("click", stop_playback);

  ["tempo", "breath", "shimmer"].forEach((name) => {
    const slider = $(`#${name}_slider`);
    const value = $(`#${name}_value`);
    slider.addEventListener("input", () => {
      value.textContent = slider.value;
    });
  });

  $$("#melody_buttons button").forEach((button) => {
    button.addEventListener("click", () => {
      app_state.melody_name = button.getAttribute("data_melody");
      $$("#melody_buttons button").forEach((item) => item.classList.remove("is_active"));
      button.classList.add("is_active");
    });
  });

  $$(".nature_panel button").forEach((button) => {
    button.addEventListener("click", () => {
      ensure_audio();
      const name = button.getAttribute("data_nature");
      app_state.nature[name] = !app_state.nature[name];
      button.classList.toggle("is_active", app_state.nature[name]);
      update_nature_layer(name);
      if (name === "birds") {
        schedule_bird_chirps();
      }
    });
  });

  ["rain", "sea", "leaves", "birds"].forEach((name) => {
    $(`#${name}_level`).addEventListener("input", () => {
      update_nature_layer(name);
    });
  });

  $$(".deck_button").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data_deck_button");
      app_state.decks[name] = !app_state.decks[name];
      button.classList.toggle("is_active", app_state.decks[name]);
      $(`[data_deck="${name}"]`).classList.toggle("is_muted", !app_state.decks[name]);
    });
  });

  $$(".koshi_note").forEach((button, index) => {
    const play = () => play_koshi_note(Number(button.getAttribute("data_degree")), index);
    button.addEventListener("pointerenter", play);
    button.addEventListener("focus", play);
    button.addEventListener("click", play);
  });
}

draw_sequences();
bind_controls();
update_disc_visuals();
