export interface PingResult {
  isPod: boolean;
  name?: string;
  timestamp?: string;
  series?: string;
  host?: string;
  status?: string;
}

export enum MachineStates {
  TURN_OFF = 0,
  PRE_SESSAO = 1,
  SESSAO = 2,
  SESSAO_LIMPEZA = 3,
  SESSAO_NOTURNO = 4,
  SESSAO_REPOUSO = 5,
  DELAY_SESSAO = 6,
}

export interface ConfigurationListItem {
  name: string;
  value: any;
}

export const estadosDeMaquina = [
  { name: 'TURN_OFF', value: 0 },
  { name: 'PRE_SESSAO', value: 1 },
  { name: 'SESSAO', value: 2 },
  { name: 'SESSAO_LIMPEZA', value: 3 },
  { name: 'SESSAO_NOTURNO', value: 4 },
  { name: 'SESSAO_REPOUSO', value: 5 },
  { name: 'DELAY_SESSAO', value: 6 },
];

export enum EquipmentStatus {
  OK = 0,
  Warning = 1,
  Error = 2,
}

export enum Commands {
  /**
   * Botao Luz pulso curto
   */
  BUTTON_LIGHT_SHORT_PULSE = 1,
  /**
   * Botao Luz pulso longo
   */
  BUTTON_LIGHT_LONG_PULSE = 2,
  /**
   * Botao Som pulso curto
   */
  BUTTON_SOUND_SHORT_PULSE = 3,
  /**
   * Acionar bomba PH (tempo em segundos)
   */
  ACTIVATE_PH_PUMP = 4,
  /**
   * Acionar bomba Cloro (tempo em segundos)
   */
  ACTIVATE_CLORO_PUMP = 5,
  /**
   * Acionar bomba H2O2 (tempo em segundos)
   */
  ACTIVATE_H2O2_PUMP = 6,
  /**
   * Acionar bomba TDS (tempo em segundos)
   */
  ACTIVATE_PUMP_TDS = 7,
  /**
   * Desligar buzzer de uma emergencia acontecida
   */
  TURNOFF_BUZZER = 8,
}

export interface Command {
  name: string;
  description: string;
  command: Commands;
  icon?: string;
  isTimeRequired?: number;
}

export interface EquipamentConfiguration {
  /**
   * senha do equipamento a ser configurado
   */
  pass: string;
  /**
   * tempo em minutos de limpeza. De 1 a 65535 minutos
   */
  cleaningTime: number;
  /**
   * seta o offset de temperatura de calibracao dos sensores. Valor em float.
   */
  offsetTemp: number;
  /**
   * seta se o buzzer em modo emergencia sera ligado ou nao. true-ligado e false-desligado
   */
  buzzer: boolean;
  /**
   * seta tempo de acionamento da bomba de pH em segundos de 1 a 65535 durante o tempo de limpeza
   */
  pHTime: number;
  /**
   * seta tempo de acionamento da bomba de Cloro em segundos de 1 a 65535 durante o tempo de limpeza
   */
  cloroTime: number;
  /**
   * seta tempo de acionamento da bomba de H2O2 em segundos de 1 a 65535 durante o tempo de limpeza
   */
  h2o2Time: number;
  /**
   * seta tempo de acionamento da bomba de Tds em segundos de 1 a 65535 durante o tempo de limpeza
   */
  tdsTime: number;
  /**
   * define se o acionamento da bomba de pH eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopPh: number;
  /**
   * define se o acionamento da bomba de cloro eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopCloro: number;
  /**
   * define se o acionamento da bomba de H2O2 eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopH2O2: number;
  /**
   * define se o acionamento da bomba de TDS eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopTDS: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de pH. De 0 a 65535
   */
  kpPh: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de pH. De 0 a 65535
   */
  kiPh: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de pH. De 0 a 65535
   */
  kdPh: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de cloro. De 0 a 65535
   */
  kpCloro: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de cloro. De 0 a 65535
   */
  kiCloro: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de cloro. De 0 a 65535
   */
  kdCloro: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de H2O2. De 0 a 65535
   */
  kpH2O2: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de H2O2. De 0 a 65535
   */
  kiH2O2: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de H2O2. De 0 a 65535
   */
  kdH2O2: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de TDS. De 0 a 65535
   */
  kpTDS: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de TDS. De 0 a 65535
   */
  kiTDS: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de TDS. De 0 a 65535
   */
  kdTDS: number;
}

export interface PodScreenData {
  status: 'OK';
  /**
   * Estado da sessão
   */
  sessionStatus: MachineStates;
  /**
   * Tempo restante do estado ou --:-- quando não disponível,
   */
  remainingTime: string;
  /**
   * Temperatura atual da agua,
   */
  actualTemperature: number;
  /**
   * Status do cooler
   */
  cooler: boolean;
  /**
   * Velocidade da ventoinha de 450 a 2000,
   */
  coolerRPM: number;
  /**
   * String com o nome da musica inicial
   */
  initialMusicFile: string;
  /**
   * String com o nome da musica final,
   */
  finalMusicFile: string;
  /**
   * String com o horário atual do equipamento,
   */
  actualTime: string;
  /**
   * String com a versao de firmware,
   */
  fwVersion: string;
  /**
   * Status do sistema do equipamento
   * 0 - OK
   * 1 - Atenção,
   * 2 - Problema no sistema que nao tem a ver com disco e conexao com servidor,
   */
  systemEquipStatus: EquipmentStatus;
  /**
   * Stus do disco do equipamento
   * 0 - OK
   * 1 - Atenção
   * 2 - Problema no SD
   */
  discEquipStatus: EquipmentStatus;
  /**
   * Indica o status de comunicação com o servidor
   * 0 - OK
   * 1 - Atenção
   * 2 - Problema na conexao com o servidor
   */
  serverEquipStatus: EquipmentStatus;
  /**
   * Array de bits de alarmes,
   * TEMPERATURE1MAIORQUETEMPERATURE2,	//BIT0 - Temperatura sensor 1 maior que temperatura sensor 2 alem do limite
   * TEMPERATURE2MAIORQUETEMPERATURE1,	//BIT1 - Temperatura sensor 2 maior que temperatura sensor 1 alem do limite
   * VS1053_NOT_PRESENT,					//BIT2 - ChipVS1053(MP3 player) não está respondendo
   * SD_FAILED,							//BIT3 - SD card não está respondendo
   * VENTILADOR_ERROR,					//BIT4 - Ventilador parado quando deveria estar em funcionamento
   * TEMPERATURE1OPENED,					//BIT5 - Sensor de temperatura 1 em aberto
   * TEMPERATURE1SHORTED,				//BIT6 - Sensor de temperatura 1 em curto
   * TEMPERATURE2OPENED,					//BIT7 - Sensor de temperatura 2 em aberto
   * TEMPERATURE2SHORTED,				//BIT8 - Sensor de temperatura 2 em curto
   * LEDSOPENED,							//BIT9 - Leds em aberto
   * LEDSSHORTED,						//BIT10 - Leds em curto
   * LEDSOVERLOADED,						//BIT11 - Leds em sobrecarga
   * EMERGENCIA,							//BIT12 - Botao de emergencia
   */
  alarm: string;
  /**
   * Campo de descrição do alarme
   * @virtual
   */
  alarmDescription?: {
    //BIT0 - Temperatura sensor 1 maior que temperatura sensor 2 alem do limite
    TEMPERATURE1MAIORQUETEMPERATURE2?: boolean;
    //BIT1 - Temperatura sensor 2 maior que temperatura sensor 1 alem do limite
    TEMPERATURE2MAIORQUETEMPERATURE1?: boolean;
    //BIT2 - ChipVS1053(MP3 player) não está respondendo
    VS1053_NOT_PRESENT?: boolean;
    //BIT3 - SD card não está respondendo
    SD_FAILED?: boolean;
    //BIT4 - Ventilador parado quando deveria estar em funcionamento
    VENTILADOR_ERROR?: boolean;
    //BIT5 - Sensor de temperatura 1 em aberto
    TEMPERATURE1OPENED?: boolean;
    //BIT6 - Sensor de temperatura 1 em curto
    TEMPERATURE1SHORTED?: boolean;
    //BIT7 - Sensor de temperatura 2 em aberto
    TEMPERATURE2OPENED?: boolean;
    //BIT8 - Sensor de temperatura 2 em curto
    TEMPERATURE2SHORTED?: boolean;
    //BIT9 - Leds em aberto
    LEDSOPENED?: boolean;
    //BIT10 - Leds em curto
    LEDSSHORTED?: boolean;
    //BIT11 - Leds em sobrecarga
    LEDSOVERLOADED?: boolean;
    //BIT12 - Botao de emergencia
    EMERGENCIA?: boolean;
  };
  /**
   * Indica se a pod está com alarme
   * @virtual
   */
  isAlarmed: boolean;
}

export interface PodConfiguration {
  /**
   * Senha do equipamento
   */
  pass: string;
  /**
   * Horario do equipamento (horas)
   */
  hour: number;
  /**
   * Horário do equipamento (minutos)
   */
  min: number;
  /**
   * Horario do equipamento (segundos)
   * @min 0
   * @max 60
   */
  sec: number;
  /**
   * Horario do equipamento (dia)
   * @min 1
   * @max 31
   */
  day: number;
  /**
   * Horario do equipamento (mês)
   * @min 1
   * @max 12
   */
  month: number;
  /**
   * Horario do equipamento (ano)
   * Utilizar apenas os dois últimos números do ano.
   * @min 00
   * @max 99
   */
  year: number;
  /**
   * Estado da máquina
   * Troca a maquina de estado(indica pra qual estado vai) 0 valor varia de 0 a 6
   */
  machineState: MachineStates;
  /**
   * Duração da sessão (em minutos)
   * de 5 a 1440 minutos
   * @min 5
   * @max 1440
   */
  sessionTime: number;
  /**
   * Duração da música inicial (em minutos)
   * a session time, onde 0 significa desabilitado
   */
  initialMusicTime: number;
  /**
   * Duração da música Final (em minutos)
   * 0 a session time, onde 0 significa desabilitado
   * o tempo somado de initial music time + final music time nao pode ser maior que session time
   */
  finalMusicTime: number;
  /**
   * Potência do led
   * @min 0
   * @max 100
   */
  ledPower: number;
  /**
   * Cor do led R
   * @min 0
   * @max 255
   */
  ledR: number;
  /**
   * Cor do led G
   * @min 0
   * @max 255
   */
  ledG: number;
  /**
   * Cor do led B
   * @min 0
   * @max 255
   */
  ledB: number;
  /**
   * Música de início da sessão
   * Nome da musica inicial da mesma forma como foi lido no comando get
   */
  initialMusic: string;
  /**
   * Música de encerramento da sessão
   * Nome da musica final da mesma forma como foi lido no comando get
   */
  finalMusic: string;
  /**
   * Define a temperatura do tanque
   * valor do setpoint de temperatura em float com um digito depois da virgula somente. De 20.0 a 37.0
   */
  setTemp: number;
  /**
   * Altura da música no tanque
   * seta o valor do volume durante sessao de 0 a 255
   * @min 0
   * @max 255
   */
  volume: number;
  /**
   * Liga ou desliga o cooler
   * seta se o ventilador fica ligado ou desligado durante sessao. true-ligado e false-desligado
   */
  cooler: boolean;
  /**
   * Seta a velocidade do ventilador durante sessao. de 450 a 2000.
   * @min 450
   * @max 2000
   */
  rpmCooler: number;
  /**
   * Seta tempo em segundos de fade para desligar/ligar os leds quando pressionar botao dentro do tanque. De 1 a 20s
   * @min 1
   * @max 20
   */
  fadeOut: number;
  /**
   * Seta tempo de delay em minutos antes da sessao. De 0 a 99 minutos.
   * @min 0
   * @max 99
   */
  sessionDelay: number;
  /**
   * Tempo em minutos de limpeza. De 1 a 65535 minutos
   * @min 1
   * @max 65535
   */
  cleaningTime: number;
  /**
   * Define se o acionamento da bomba de pH eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopPh: boolean;
  /**
   * Define se o acionamento da bomba de cloro eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopCloro: boolean;
  /**
   * Define se o acionamento da bomba de H2O2 eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopH2O2: boolean;
  /**
   * Define se o acionamento da bomba de TDS eh em malha aberta ou malha fechada. true - malha fechada, false - malha aberta
   */
  closedLoopTDS: boolean;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de pH. De 0 a 65535
   */
  kpPh: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de pH. De 0 a 65535
   */
  kiPh: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de pH. De 0 a 65535
   */
  kdPh: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de cloro. De 0 a 65535
   */
  kpCloro: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de cloro. De 0 a 65535
   */
  kiCloro: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de cloro. De 0 a 65535
   */
  kdCloro: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de H2O2. De 0 a 65535
   */
  kpH2O2: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de H2O2. De 0 a 65535
   */
  kiH2O2: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de H2O2. De 0 a 65535
   */
  kdH2O2: number;
  /**
   * Valor do coeficiente kp do PID de acionamento da bomba de TDS. De 0 a 65535
   */
  kpTDS: number;
  /**
   * Valor do coeficiente ki do PID de acionamento da bomba de TDS. De 0 a 65535
   */
  kiTDS: number;
  /**
   * Valor do coeficiente kd do PID de acionamento da bomba de TDS. De 0 a 65535
   */
  kdTDS: number;
  /**
   * Seta se o buzzer em modo emergencia sera ligado ou nao. true-ligado e false-desligado
   */
  buzzer: boolean;
  /**
   * Seta o offset de temperatura de calibracao dos sensores. Valor em float.
   */
  offsetTemp: number;
  /**
   * Seta tempo de acionamento da bomba de pH em segundos de 1 a 65535 durante o tempo de limpeza
   */
  pHTime: number;
  /**
   * seta tempo de acionamento da bomba de Cloro em segundos de 1 a 65535 durante o tempo de limpeza
   */
  cloroTime: number;
  /**
   * seta tempo de acionamento da bomba de H2O2 em segundos de 1 a 65535 durante o tempo de limpeza
   */
  h2o2Time: number;
  /**
   * seta tempo de acionamento da bomba de Tds em segundos de 1 a 65535 durante o tempo de limpeza
   */
  tdsTime: number;
}

export interface LoadStatusResponse {
  status: EquipmentStatus;
  heater: boolean;
  UV: boolean;
  INV: boolean;
  cooler: boolean;
  coolerRPM: boolean;
  som: boolean;
  leds: boolean;
  phPump: boolean;
  cloroPump: boolean;
  h2o2Pump: boolean;
  tdsPump: boolean;
}
