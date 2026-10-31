import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '../../data/industries';
import { SectorCard } from '../ui/SectorCard';
import { navigate } from '../../lib/router';

/** Home-page overview of the sectors we serve; full detail lives on /industries. */
export const IndustriesTeaser: React.FC = () => (
  <section id="industries" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Industries we serve</div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
            Built for sectors where reliability matters most.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From operation theatres and lecture halls to secure public buildings and corporate campuses.
          </p>
        </motion.div>
        <a
          href="/industries"
          onClick={(e) => {
            e.preventDefault();
            navigate('/industries');
          }}
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 text-sm font-semibold text-[#0A8BD3] hover:ring-[#0A8BD3]/50 hover:bg-[#F3F9FD] transition whitespace-nowrap self-start md:self-auto"
        >
          Explore all industries
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {INDUSTRIES.map((ind, i) => (
          <SectorCard key={ind.id} industry={ind} index={i} />
        ))}
      </div>
    </div>
  </section>
);
