import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Github
} from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { clearPendingMessages, listPendingMessages, savePendingMessage } from "../lib/pwaDatabase";

// Constantes
const SERVICE_ID = "service_lhwgzf1";
const TEMPLATE_ID = "template_ij4d9sa";
const PUBLIC_KEY = "9XQvluXO5Lui5xZWc";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const form = useRef(null);

  useEffect(() => {
    const syncOfflineMessages = async () => {
      const pendingMessages = await listPendingMessages();
      if (!pendingMessages.length || !navigator.onLine) return;
      setIsSyncing(true);

      for (const message of pendingMessages) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, message, { publicKey: PUBLIC_KEY });
      }
      await clearPendingMessages();
      toast({
        title: "Mensajes sincronizados",
        description: "Se enviaron los formularios guardados sin conexión"
      });
      setIsSyncing(false);
    };

    window.addEventListener("online", syncOfflineMessages);
    syncOfflineMessages();

    return () => window.removeEventListener("online", syncOfflineMessages);
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(form.current);
    const payload = Object.fromEntries(formData.entries());

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, { publicKey: PUBLIC_KEY });
      toast({
        title: "Message sent!",
        description:
          "Thank you for your message. I'll get back to you soon.",
      });
      form.current.reset();
    } catch (error) {
      await savePendingMessage(payload);
      toast({
        title: "Guardado para enviar",
        description: "No hay conexión. Enviaremos el mensaje en cuanto vuelvas a estar en línea.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#F5F8FF] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* TÍTULO */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#101828] sm:text-4xl md:text-5xl">
            Contact Us
          </h2>
          {isSyncing && (
            <p className="mt-2 text-sm text-[#3D9034]">Sincronizando mensajes pendientes...</p>
          )}
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* FORMULARIO (izquierda) */}
          <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <form ref={form} onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#475467]"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] shadow-xs outline-none focus:border-[#3D9034] focus:ring-2 focus:ring-[#3D9034]/20"
                />
              </div>

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#475467]"
                >
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="full name"
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] shadow-xs outline-none focus:border-[#3D9034] focus:ring-2 focus:ring-[#3D9034]/20"
                />
              </div>

              {/* NUMBER */}
              <div>
                <label
                  htmlFor="number"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#475467]"
                >
                  number
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  placeholder="your number"
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] shadow-xs outline-none focus:border-[#3D9034] focus:ring-2 focus:ring-[#3D9034]/20"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#475467]"
                >
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="describe your project ..."
                  rows={5}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] shadow-xs outline-none focus:border-[#3D9034] focus:ring-2 focus:ring-[#3D9034]/20 resize-none"
                />
              </div>

              {/* BOTÓN */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3D9034] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F6F28] disabled:cursor-not-allowed disabled:bg-[#9CC7A0]"
                )}
              >
                {isSubmitting ? "Sending..." : "Contact Us"}
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* TARJETA DE CONTACTO (derecha) */}
          <div className="flex items-stretch justify-center">
            <div className="flex w-full max-w-sm flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
              <div>
                <h3 className="text-right text-base font-semibold text-[#101828]">
                  Our contact
                  <br />
                  information
                </h3>

                <div className="mt-8 space-y-5">
                  {/* PHONE */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EA]">
                      <Phone className="h-5 w-5 text-[#3D9034]" />
                    </div>
                    <div className="text-sm text-[#101828]">
                      <p>512-680-7963</p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EA]">
                      <Mail className="h-5 w-5 text-[#3D9034]" />
                    </div>
                    <div className="text-sm text-[#101828]">
                      <p>trebolpools@hotmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOGO */}
              <div className="mt-8 flex justify-center">
                <div className="h-28 w-28 overflow-hidden rounded-2xl bg-[#3D9034] p-2">
                  {/* Cambia la ruta por tu logo real en /public */}
                  <img
                    src="/trebol_logo.png"
                    alt="Trebol Pools logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
