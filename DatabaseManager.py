import psycopg

class database_protocol:
    def __init__(self, buffer_size, database, username):
        self.reminders = []
        self.buffer_size = buffer_size
        self.username = username
        self.database = database
        self.up_to_date = False

        self.fill_reminders()

    def fill_reminders(self):
        with psycopg.connect("dbname={database} user={username}".format(database=self.database, username=self.username)) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM reminders WHERE seen = false ORDER BY alarm LIMIT {limit}".format(limit = self.buffer_size))

                temp = []
                for record in cur:
                    temp.append(record)

                cur.execute("SELECT reminder_id, snooze_id, snooze_time, title, description FROM reminders r NATURAL JOIN snoozed_reminders s WHERE r.seen = false ORDER BY s.snooze_time LIMIT {limit}".format(limit = self.buffer_size))

                temp2 = []
                for record in cur:
                    temp2.append(record)

                i = 0
                while (len(temp2) > 0 or len(temp) > 0) and (i < self.buffer_size): 
                    if len(temp2) == 0:
                        self.reminders.append(temp.pop(0))
                    elif len(temp) == 0:
                        self.reminders.append(temp2.pop(0))
                    elif temp2[0][2] < temp[0][3]:
                        self.reminders.append(temp2.pop(0))
                    else:
                        self.reminders.append(temp.pop(0))
                    i+=1
                self.up_to_date = True
    
    def snooze_reminder(self, reminder_id, new_snooze_time):
        with psycopg.connect("dbname={database} user={username}".format(database=self.database, username=self.username)) as conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE reminders SET seen = true WHERE reminder_id = {id}".format(id = reminder_id))
                cur.execute("INSERT INTO snoozed_reminders(reminder_id, snooze_time) VALUES(%s, %s)", (reminder_id, new_snooze_time))

                conn.commit()
                self.up_to_date = False

    def add_reminder(self, title, description, alarm, repeat):
        with psycopg.connect("dbname={database} user={username}".format(database=self.database, username=self.username)) as conn:
            with conn.cursor() as cur:
                cur.execute("INSERT INTO reminders(title, description, alarm, repeat) VALUES(%s, %s, %s, %s)", (title, description, alarm, repeat))

                conn.commit()
                self.up_to_date = False

    def seen_reminder(self, reminder_id):
        with psycopg.connect("dbname={database} user={username}".format(database=self.database, username=self.username)) as conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE reminders SET seen = true WHERE reminder_id = %s", (reminder_id))

                conn.commit()
                self.up_to_date = False

    def seen_snooze(self, snooze_id):
        with psycopg.connect("dbname={database} user={username}".format(database=self.database, username=self.username)) as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM snoozed_reminders WHERE snooze_id = %s", (snooze_id))

                conn.commit()
                self.up_to_date = False


db_d = database_protocol(10, "test123", "postgres")
print(db_d.reminders)
