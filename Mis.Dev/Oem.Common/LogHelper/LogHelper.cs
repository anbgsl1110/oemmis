using System;
using System.IO;

namespace Oem.Common.LogHelper
{
    public class LogHelper : ILog
    {
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="logPath">日志路径</param>
        /// <param name="logName">日志文件名</param>
        /// <param name="exception">异常</param>
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

        /// <summary>
        /// 把信息写到指定文件的尾部
        /// </summary>
        /// <param name="fileName">文件完整路径</param>
        /// <param name="msg">信息文本</param>
        public void WriteToFile(string fileName, string msg)
        {
            using (StreamWriter swWriter = new StreamWriter(new FileStream(fileName, FileMode.Append)))
            {
                swWriter.WriteLine(msg);
            }
        }

        /// <summary>
        /// 向日志文件中输入一个空行
        /// </summary>
        public void WriteSpaceLine()
        {
            WriteLog(String.Empty);
        }

        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// /// <param name="logPath">日志路径</param>
        public void WriteLog(string message, string logPath)
        {
            WriteLog(message, logPath, DateTime.Now.ToString("yyyy-MM-dd") + ".log", null);
        }

        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="message">日志信息</param>
        public void WriteLog(string message)
        {
            WriteLog(message, AppContext.BaseDirectory + "\\log");
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="message"></param>
        /// <param name="ex"></param>
        public void WriteLog(string message, Exception ex)
        {
            WriteLog(message, AppContext.BaseDirectory + "\\log", DateTime.Now.ToString("yyyy-MM-dd") + ".log", ex);
        }


        /// <summary>
        /// 写登录日志
        /// </summary>
        /// <param name="message">日志信息</param>
        public void WriteLoginLog(string message)
        {
            WriteLog(message, AppContext.BaseDirectory + "\\loginlog");
        }

        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="exception"></param>
        /// <param name="addition"></param>
        public void WriteLog(Exception exception, string addition = "")
        {
            WriteLog(exception.Message + "|" + addition);
        }
    }
}