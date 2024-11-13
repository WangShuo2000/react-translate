import { useState } from 'react'
import { Globe2, ArrowLeftRight, Volume2, Copy, Check, X } from 'lucide-react';

export default function TranslationApp() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTranslate = async () => {
    try {
      const res = await fetch(`/api`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'trouvaille-translate-api-key',
          'Authorization': 'Bearer trouvaille-translate-api-key'
        },
        credentials: 'include',
        body: JSON.stringify({
          text: encodeURIComponent(sourceText),
          source: sourceLang,
          target: targetLang
        })
      })
      const target = await res.json()
      setTranslatedText(target.response?.translated_text || '')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <Globe2 className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Universal Translator</h1>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between mb-6">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSwapLanguages}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftRight className="h-5 w-5 text-gray-500" />
            </button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 gap-6">
            {/* Source Text */}
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <button 
                  onClick={() => handleCopy(sourceText)}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
                </button>
                <button className="p-1.5 rounded-full hover:bg-gray-100">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                </button>
                <button 
                  onClick={() => setSourceText('')}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Translated Text */}
            <div className="relative">
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-32 p-4 rounded-lg border border-gray-300 bg-gray-50"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <button 
                  onClick={() => handleCopy(translatedText)}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-gray-100">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Translate Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleTranslate}
              disabled={!sourceText}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Translate
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Powered by Universal Translator
        </div>
      </div>
    </div>
  );
}