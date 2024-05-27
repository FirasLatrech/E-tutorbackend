import { CronJob } from 'cron';
import * as child_process from 'child_process';


const job = new CronJob('0 0 * * 0', () => {
  child_process.exec('cmd /c backup.bat', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Backup successful: ${stdout}`);
  });
});

job.start();
