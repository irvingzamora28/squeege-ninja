'use client'
import React, { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata.js'

interface Option {
  label: string
  value: string
}

interface InteractiveQuestionProps {
  question: string
  options: Option[]
  explanation?: string
  id: string // Unique id per question per post
  votes: Record<string, number> // Nuevo prop obligatorio
  language?: 'es-mx' | 'en-us'
}

const translations = {
  'en-us': {
    vote: 'Vote',
    results: 'Results',
    voted: 'You already voted',
    showResults: 'Show results',
    explanation: 'Explanation',
    totalVotes: 'Total votes',
  },
  'es-mx': {
    vote: 'Votar',
    results: 'Resultados',
    voted: 'Ya votaste',
    showResults: 'Ver resultados',
    explanation: 'Explicación',
    totalVotes: 'Votos totales',
  },
}

// Simple localStorage voting (per user, per question)
const getVotes = (id: string): Record<string, number> => {
  if (typeof window === 'undefined') return {}
  const data = localStorage.getItem(`iq-votes-${id}`)
  return data ? JSON.parse(data) : {}
}
const setVotes = (id: string, votes: Record<string, number>) => {
  localStorage.setItem(`iq-votes-${id}`, JSON.stringify(votes))
}

const getVotedOption = (id: string): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(`iq-voted-${id}`)
}
const setVotedOption = (id: string, value: string) => {
  localStorage.setItem(`iq-voted-${id}`, value)
}

const InteractiveQuestion: React.FC<InteractiveQuestionProps> = ({
  question,
  options,
  explanation,
  id,
  votes,
  language = siteMetadata.language as 'es-mx' | 'en-us',
}) => {
  const t = translations[language]
  const [selected, setSelected] = useState<string | null>(null)
  const [votesState, setVotesState] = useState<Record<string, number>>(votes)
  const [voted, setVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setVotesState(votes)
    const alreadyVoted = !!getVotedOption(id)
    setVoted(alreadyVoted)
    if (alreadyVoted) setShowResults(true)
  }, [id, votes])

  const handleVote = () => {
    if (!selected || voted) return
    const updatedVotes = { ...votesState }
    updatedVotes[selected] = (updatedVotes[selected] || 0) + 1
    setVotesState(updatedVotes)
    setVotedOption(id, selected)
    setVoted(true)
    setShowResults(true)
  }

  const totalVotes = Object.values(votesState).reduce((a, b) => a + b, 0)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="iq-container my-6 rounded-lg border bg-gradient-to-r from-red-500/10 to-black/60 p-4 shadow-lg">
      <div className="mb-2 text-lg font-bold">{question}</div>
      {!mounted ? (
        // Skeleton/placeholder, same layout, no shift
        <>
          <div className="mb-4 flex flex-col gap-2">
            {options.map((opt, i) => (
              <div
                key={opt.value}
                className="mb-2 flex w-full animate-pulse items-start gap-3 rounded border border-gray-700/30 bg-gray-700/10 p-3 opacity-60"
                style={{ alignItems: 'flex-start' }}
                aria-hidden="true"
              >
                <span className="mr-2 inline-block h-4 w-4 rounded-full border border-gray-400 bg-gray-400/30"></span>
                <span className="block h-4 w-full rounded bg-gray-400/30"></span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="bg-primary-600/30 h-8 w-24 animate-pulse rounded px-4 py-2 text-white/40"></span>
            <span className="ml-4 h-6 w-20 animate-pulse rounded text-sm text-gray-400/40 underline"></span>
          </div>
        </>
      ) : !voted && !showResults ? (
        <>
          <div className="mb-4 flex flex-col gap-2">
            {options.map((opt) => (
              <label
                key={opt.value}
                className={`mb-2 flex w-full cursor-pointer items-start gap-3 rounded border border-gray-700/30 p-3 transition ${selected === opt.value ? 'bg-primary-50 dark:bg-primary-900/20 ring-primary-500 ring-2' : 'hover:bg-gray-700/10 dark:hover:bg-gray-700/30'} focus-within:ring-primary-500 focus-within:ring-2`}
                style={{ alignItems: 'flex-start' }}
              >
                <input
                  type="radio"
                  name={`iq-${id}`}
                  value={opt.value}
                  checked={selected === opt.value}
                  onChange={() => setSelected(opt.value)}
                  className="accent-primary-600 mt-1"
                />
                <span className="block w-full text-left text-base break-words whitespace-normal">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
          <button
            className="bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white transition"
            onClick={handleVote}
            disabled={!selected}
          >
            {t.vote}
          </button>
          <button
            className="hover:text-primary-500 ml-4 text-sm text-gray-400 underline"
            onClick={() => setShowResults(true)}
            type="button"
          >
            {t.showResults}
          </button>
        </>
      ) : (
        <div className="mt-4">
          <div className="mb-2 font-semibold">{t.results}</div>
          <ul className="mb-2">
            {options.map((opt) => {
              const count = votesState[opt.value] || 0
              const percent = totalVotes ? Math.round((count / totalVotes) * 100) : 0
              return (
                <li key={opt.value} className="mb-4 flex w-full flex-col items-start">
                  <span className="mb-1 block w-full text-base font-medium break-words whitespace-normal">
                    {opt.label}
                  </span>
                  <div className="flex w-full items-center gap-2">
                    <div className="h-3 flex-1 rounded bg-gray-700">
                      <div
                        className="bg-primary-500 h-3 rounded"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="min-w-[60px] text-right text-xs text-gray-300">
                      {count} ({percent}%)
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mb-2 text-xs text-gray-400">
            {t.totalVotes}: {totalVotes}
          </div>
          {explanation && (
            <div className="rounded bg-gray-800 p-2 text-sm text-gray-200">
              <span className="font-semibold">{t.explanation}: </span>
              {explanation}
            </div>
          )}
        </div>
      )}
      {voted && <div className="text-primary-500 mt-2 text-xs">{t.voted}</div>}
    </div>
  )
}

export default InteractiveQuestion
