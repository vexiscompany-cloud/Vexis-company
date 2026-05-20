import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, MessageCircle, CheckCircle2, ChevronRight, Loader2, Send } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Lazy initialize Supabase client
const getSupabase = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

const Search = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const Target = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const BarChart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);


const HERO_IMAGE_BASE64 = "data:image/png;base64,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";

const METODOLOGIA_STEPS = [
  {
    title: "ESTRATÉGIA",
    desc: "Atração do público certo com o anúncio exato para que os clientes cheguem até você.",

    icon: <Search className="w-8 h-8 text-gold" />
  },
  {
    title: "AUTORIDADE",
    desc: "Criação de conteúdo e posicionamento que passam confiança imediata.",
    icon: <Target className="w-8 h-8 text-gold" />
  },
  {
    title: "AQUECIMENTO",
    desc: "Nutrição rápida dos leads para que cheguem prontos para a visita.",
    icon: <Users className="w-8 h-8 text-gold" />
  },
  {
    title: "GERAÇÃO",
    desc: "Mecanismo de escala para repetir o processo e bater metas todo mês.",
    icon: <BarChart className="w-8 h-8 text-gold" />
  }
];

const CHECKLIST_ITEMS = [
  "Trabalha muito e vende pouco?",
  "Depende apenas de indicações e portais?",
  "Sente que sua presença digital é fraca?",
  "Atende leads 'curiosos' que não têm dinheiro?",
  "Não sabe como escalar seus anúncios?"
];

export default function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    experiencia: 'Nunca fiz anúncios'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/5591988626328";
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const supabase = getSupabase();
      
      if (!supabase) {
        throw new Error('Configuração do Supabase ausente. Verifique as variáveis de ambiente.');
      }

      // Save to Supabase
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            nome: formData.nome,
            email: formData.email,
            whatsapp: formData.whatsapp,
            empresa: formData.empresa,
            experiencia: formData.experiencia,
            created_at: new Date().toISOString() 
          }
        ]);

      if (error) throw error;
      
      setIsSubmitted(true);
      
      // WhatsApp text as a fallback/next step
      const text = `Olá! Acabei de enviar o formulário no site e tenho interesse na Vexis Company.%0A%0A*Dados do formulário:*%0A*Nome:* ${formData.nome}%0A*E-mail:* ${formData.email}%0A*WhatsApp:* ${formData.whatsapp}%0A*Empresa:* ${formData.empresa}%0A*Já investiu em tráfego pago?:* ${formData.experiencia}`;
      
      // Delay redirect slightly so they see the success message
      setTimeout(() => {
        window.location.href = `https://wa.me/5591988626328?text=${text}`;
      }, 2000);

    } catch (error) {
       console.error('Supabase Error:', error);
       alert('Erro ao enviar formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-gold selection:text-black overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-transparent py-4 text-white">
        <div className="container mx-auto px-6 flex justify-center md:justify-between items-center">
          <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-center opacity-70 md:opacity-100">
            <img src="https://i.imgur.com/yFYxnAk.png" alt="Vexis Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-white uppercase">VEXIS</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#comofunciona" className="hover:text-gold transition-colors">Como funciona</a>
            <a href="#metodologia" className="hover:text-gold transition-colors">Metodologia</a>
            <button 
              onClick={handleWhatsApp}
              className="bg-gold text-black px-6 py-2 rounded-full font-bold transition-transform flex items-center gap-2"
            >
              Falar no WhatsApp
              <MessageCircle size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        
        {/* HERO */}
        <section id="hero" className="relative min-h-[90vh] flex items-center py-24 md:py-20 overflow-hidden bg-black">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20 pt-16 md:pt-0 text-white">
            <div className="text-left">
              <h1 className="font-display font-black tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl leading-[1.15] mb-6 max-w-2xl">
                A Vexis Company nasceu para<br />
                transformar <span className="text-gold">corretores de imóveis</span><br />
                em máquinas de fechar negócios.
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
                Já movimentamos milhões de reais em vendas de imóveis em todo o Brasil. Agora, aplicamos esse conhecimento exclusivamente com corretores — com estratégia, método e resultado comprovado.
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 h-full w-full md:w-1/2 overflow-hidden flex z-10">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 hidden md:block"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
             <img 
               src="https://i.imgur.com/yWL1D6ih.jpg" 
               alt="Vexis Hero" 
               className="w-full h-full object-cover opacity-60 md:opacity-100 object-top md:object-center"
               referrerPolicy="no-referrer"
             />
          </div>
        </section>

        {/* O QUE VOCÊ RECEBE */}
        <section className="py-24 bg-black/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display font-black tracking-tighter text-3xl md:text-5xl lg:text-3xl mb-4 text-gold uppercase">O QUE VOCÊ RECEBE NA NOSSA CONSULTORIA GRATUITA?</h2>
              <div className="w-24 h-1 bg-gold mx-auto opacity-50"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "ENTENDENDO SUA ATUAL SITUAÇÃO", text: "Começamos com uma análise completa da sua situação atual e, juntos, identificamos os desafios e gargalos que estão limitando seu crescimento." },
                { num: "02", title: "O QUE SUA EMPRESA REALMENTE PRECISA", text: "Depois de entendermos onde sua empresa está, iremos te mostrar exatamente o que precisa ser feito e qual é o próximo passo que a sua empresa precisa dar." },
                { num: "03", title: "PLANO DE AÇÃO ESTRATÉGICO", text: "Além de te dar o próximo passo, vamos criar um plano de ação estratégico para você aumentar sua demanda qualificada e o número de vendas. Receba um plano de ação claro e estratégico, criado especialmente para que sua empresa possa escalar cada vez mais." }
              ].map((card, i) => (
                <div 
                  key={i}
                  className="bg-dark-card p-6 md:p-10 rounded-2xl border border-white/5 hover:border-gold/30 transition-all group"
                >
                  <span className="font-display font-black text-xl text-gold mb-6 block opacity-50 group-hover:opacity-100 transition-opacity">
                    PASSO {card.num}
                  </span>
                  <h3 className="font-display font-bold text-2xl mb-4 group-hover:text-gold transition-colors">{card.title}</h3>
                  <p className="text-white/60 leading-relaxed text-xs md:text-lg">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="comofunciona" className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-gold tracking-[0.3em] font-bold text-sm mb-2 block uppercase">VAMOS ACELERAR</span>
                <h2 className="font-display font-black tracking-tight text-3xl md:text-5xl mb-8 leading-tight">
                  DAR O PRÓXIMO PASSO LEVA APENAS UM MINUTO
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <span className="font-display font-black text-4xl text-gold">01</span>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Preencha o formulário.</h4>
                      <p className="text-white/60 leading-relaxed">Envie suas informações de contato. Todos os seus dados estarão seguros. Vamos cuidar bem deles.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <span className="font-display font-black text-4xl text-gold">02</span>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Receba uma ligação de nossos especialistas.</h4>
                      <p className="text-white/60 leading-relaxed">Em até 12 horas, um dos nossos especialistas fará uma ligação para agendar a reunião mais importante para a sua corretora. E juntos, iremos criar um plano completo para ter leads qualificados todos os dias.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORMULÁRIO */}
              <div className="bg-dark-card p-6 md:p-10 rounded-3xl border border-gold/20 shadow-2xl shadow-gold/5 max-w-lg md:ml-auto w-full backdrop-blur-sm bg-black/40">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="bg-gold/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-gold w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase">Solicitação Enviada!</h3>
                    <p className="text-white/70 mb-8">
                      Obrigado, {formData.nome.split(' ')[0]}! Seus dados foram guardados com sucesso. 
                      Agora estamos te redirecionando para o nosso WhatsApp para agilizar seu atendimento...
                    </p>
                    <div className="flex justify-center gap-2">
                       <Loader2 className="animate-spin text-gold" />
                       <span className="text-gold text-sm font-bold uppercase tracking-widest">Redirecionando...</span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">Nome Completo</label>
                      <input 
                        type="text" required 
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                        placeholder="Ex: João Silva"
                        disabled={isSubmitting}
                        value={formData.nome || ''}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">E-mail corporativo</label>
                      <input 
                        type="email" required 
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                        placeholder="seuemail@empresa.com"
                        disabled={isSubmitting}
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">Telefone da pessoa (com DDD)</label>
                      <input 
                        type="tel" required 
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                        placeholder="(00) 00000-0000"
                        disabled={isSubmitting}
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">Nome da empresa</label>
                      <input 
                        type="text" required 
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                        placeholder="Ex: Imobiliária Vexis"
                        disabled={isSubmitting}
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-4 uppercase tracking-wider text-white/50">Já investiu em tráfego pago?</label>
                      <div className="space-y-3">
                        {[
                          "Já contratei uma agência no passado",
                          "Nunca fiz anúncios",
                          "Já fiz anúncios por conta própria",
                          "Estou com uma agência, porém insatisfeito"
                        ].map((item) => (
                          <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="radio" name="exp" 
                              className="w-5 h-5 accent-gold border-white/20 bg-black cursor-pointer"
                              disabled={isSubmitting}
                              checked={formData.experiencia === item}
                              onChange={() => setFormData({...formData, experiencia: item})}
                            />
                            <span className="group-hover:text-gold transition-colors text-xs md:text-sm uppercase font-medium">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold text-black font-display font-bold text-xl py-5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold/20 uppercase mt-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          PROCESSANDO...
                        </>
                      ) : (
                        <>
                          ENVIAR AGORA
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* METODOLOGIA - MÉTODO CAAG */}
        <section id="metodologia" className="py-24 bg-black/40 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="text-gold tracking-[0.3em] font-bold text-sm mb-4 block">EXCLUSIVIDADE VEXIS</span>
              <h2 className="font-display font-black tracking-tighter text-3xl md:text-5xl lg:text-3xl mb-4 uppercase">MÉTODO <span className="text-gold">CAAG</span></h2>
              <p className="text-white/50 max-w-2xl mx-auto italic">O sistema testado para converter cliques em escrituras assinadas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden md:block"></div>
              
              {METODOLOGIA_STEPS.map((step, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="bg-dark-card w-20 h-20 rounded-full flex items-center justify-center border-2 border-gold mb-6 relative z-10 group-hover:scale-110 transition-transform shadow-lg shadow-gold/10">
                    {step.icon}
                  </div>
                  <h4 className="font-display font-bold text-sm text-gold tracking-widest mb-2 uppercase">PASSO 0{i+1}</h4>
                  <h3 className="font-display font-bold text-3xl mb-4 uppercase">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VOCÊ SE IDENTIFICA? */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="p-10 md:p-16">
              <h2 className="font-display font-black tracking-tight text-2xl md:text-3xl lg:text-2xl text-center mb-12 uppercase">VOCÊ SE <span className="text-gold">IDENTIFICA</span> COM ISSO?</h2>
              
              <div className="space-y-6 mb-12">
                {CHECKLIST_ITEMS.map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-4 text-lg md:text-xl border-b border-white/5 pb-4"
                  >
                    <CheckCircle2 className="text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-white/50 mb-8 font-medium">Se você marcou pelo menos 2 desses itens, sua corretora está deixando dinheiro na mesa.</p>
                <button 
                  onClick={handleWhatsApp}
                  className="w-full md:w-auto bg-gold text-black font-display font-bold text-base md:text-lg px-8 py-4 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold/20 uppercase"
                >
                  EU QUERO MUDAR ISSO AGORA
                </button>
              </div>
            </div>
          </div>
        </section>



      </main>

      {/* FOOTER */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 text-white/30 text-sm gap-4">
            <p>© Vexis Company 2026. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-gold transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

