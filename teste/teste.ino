int recebido = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(13, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // myservo.write(255);


  if(Serial.available() > 0)
  {
    recebido = Serial.read();
  }
  
    if(recebido == '1')
    {
      digitalWrite(13, !digitalRead(13));
    }

    recebido = 0;
}
