using System;
using System.IO;

namespace Oem.Common.LogHelper
{
    public class LogHelper : ILog
    {
        public void WriteLog(string message,string logPath,string logName, Exception exception)
        {
            string logFile = Path.Combine(logPath, logName);
            if (!Directory.Exists(logPath))
            {
                Directory.CreateDirectory(logPath);
            }
            if (!File.Exists(logFile))
            {
                File.Create(logFile);
            }

            try
            {
                var now = DateTime.Now.ToString("\r\n\r\n yyyy-MM-dd HH:mm:ss--");
                WriteToFile(logFile,now+message + "\r\n");
                if (exception != null)
                {
                    WriteToFile(logFile, exception.Message + "\r\n");
                    WriteToFile(logFile, exception.StackTrace + "\r\n");
                }
            }
            catch (Exception e)
            {
                throw new AggregateException(e);
            }
        }

        public void WriteToFile(string fileName, string msg)
        {
            using (StreamWriter swWriter = new StreamWriter(new FileStream(fileName, FileMode.Append)))
            {
                swWriter.WriteLine(msg);
            }
        }

        public void WriteSpaceLine()
        {
            WriteLog(String.Empty);
        }

        public void WriteLog(string message, string logPath)
        {
            WriteLog(message, logPath, DateTime.Now.ToString("yyyy-MM-dd") + ".log", null);
        }

        public void WriteLog(string message)
        {
            WriteLog(message, AppContext.BaseDirectory + "\\log");
        }

        public void WriteLog(string message, Exception ex)
        {
            WriteLog(message, AppContext.BaseDirectory + "\\log", DateTime.Now.ToString("yyyy-MM-dd") + ".log", ex);
        }

        public void WriteLoginLog(string message)
        {
            WriteLog(message, AppContext.BaseDirectory + "\\loginlog");
        }

        public void WriteLog(Exception exception, string addition = "")
        {
            WriteLog(exception.Message + "|" + addition);
        }
    }
}